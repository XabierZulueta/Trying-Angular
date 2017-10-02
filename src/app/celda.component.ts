import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Celda } from './celda';
import { CeldaService } from './celda.service';
@Component({
    template:`<div class="container">
     <input [(ngModel)]="size" type="number" />
        <a class="btn btn-default" 
                 (click)="nuevoLaberinto(size)"  >
                Generar
                </a>
                <a class="btn btn-default" 
                 (click)="buscar()"  >
                Buscar
                </a>
       <!-- <table class="table" style="border: 0.5px solid #d0d0d0; width:50px;">
            <thead style="text-align:center;background-color:#0089ff;color:white;">
                <tr >
                    <td > Celda <div *ngIf="selectedCelda" >{{selectedCelda.x}} {{selectedCelda.y}}
                    </div></td>
                </tr>
            </thead>
            <tbody >    
               <div *ngIf="selectedCelda" > 
                <tr>
                    <td >
                        H: {{selectedCelda.h}} 
                    </td>
                    <td>
                        G: {{selectedCelda.g}}
                    </td>
                </tr>
                <tr>
                    <td>
                        F: {{selectedCelda.f}}
                    </td>
                    <td>
                        V: {{selectedCelda.tipo.velocidad}}
                    </td>
                </tr>
               </div>
            </tbody>
        </table>-->
    <br/><br/>
    <ul class="laberinto">
        <li *ngFor="let celda of laberinto" style="list-style:none;">
            <ul>
                <a class="btn btn-default" *ngFor="let c of celda" [class.selected]="c === selectedCelda"
                (mouseover)="onSelect(c)" (click)="changeTipo(c, laberinto); generarHijos(c)"  [style.background]="c.tipo.color">
                    {{c.x}}{{c.y}}
                </a>
            </ul>
        </li>
    </ul>
</div>`,
    selector: 'laberinto', 
    styles: ['.table td{  text-align: center;   }']
})

export class CeldaComponent implements OnInit{
    laberinto : Celda[][];
    selectedCelda : Celda;
    hijos = new Array<Celda>();
    size : number;
    abiertos :Celda[]; ;
    cerrados = new Array<Celda>();

    onSelect(celda: Celda): void {
        this.selectedCelda = celda;
    }

    constructor(private router: Router,
        private celdaService: CeldaService) { }

   /* getLaberinto(): void {
        this.celdaService.getLaberinto().then(laberinto => this.laberinto = laberinto);
    }*/

    ngOnInit(): void {
        //this.getLaberinto();
        this.size=3;
        this.abiertos = new Array<Celda>();
    }

    changeTipo(celda : Celda, laberinto: Celda[][]): void{
        switch(celda.tipo.tipo){
            case 'CAMPO':
                celda.tipo.tipo = 'OBSTACULO';
                celda.tipo.color = '#8e8e8e';
                celda.tipo.velocidad = 0.0;
                break;
            case 'OBSTACULO':
                celda.tipo.tipo = 'CAMPO';
                celda.tipo.color = '#fff';
                celda.tipo.velocidad = 1.0;
                break;
        }
        this.selectedCelda = celda;
        this.calcularHeuristicas();
    }

    calcularHeuristicas():void{
        for(var i=0; i<this.laberinto.length; i++){
            for (var j = 0; j < this.laberinto[i].length; j++) {
                if (this.laberinto[i][j].tipo.tipo=='CAMPO')
                    this.laberinto[i][j].h = this.calcularHeuristica(this.laberinto[i][j]);
                else
                    this.laberinto[i][j].h = 0;
            }
        }
    }

    calcularHeuristica(celda: Celda) : number{
        return Math.max(Math.abs((this.laberinto.length-1)  - celda.y), Math.abs((this.laberinto.length-1) - celda.x));
    }

    explorarCelda(celda: Celda):void{
        this.hijos =  this.generarHijos(celda);
        for(var i = 0;i<this.hijos.length; i++){
            if (this.cerrados.indexOf(this.hijos[i]) == -1 && this.abiertos.indexOf(this.hijos[i])==-1){
                this.abiertos.push(this.hijos[i]);
                console.log(this.abiertos[0]);
                this.abiertos.sort(function (a, b){
                    return a.f-b.f;
                });
                console.log(this.abiertos[0]);
            }
        }

    }

    generarHijos(celda : Celda) : Celda[]{
        var hijo : Celda;
        //Miro la celda de arriba si no estoy en la primera fila.
        if(celda.y>0){
            if (this.laberinto[celda.y-1][celda.x].tipo.tipo != 'OBSTACULO'){
                hijo = this.generarCelda(celda, this.laberinto[celda.y-1][celda.x]);
                this.hijos.push(hijo);
            }
        }
        //Miro si no estoy en la esquina superior derecha.
        if (celda.x < this.laberinto.length - 1 && celda.y > 0)
            if (this.laberinto[celda.y - 1][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y - 1][celda.x + 1]);
                this.hijos.push(hijo);
            } 
        //Miro si no estoy en la última columna
        if (celda.x < this.laberinto.length - 1)
            if (this.laberinto[celda.y][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y][celda.x + 1]);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la esquina de abajo a la derecha.
        if (celda.x < this.laberinto.length - 1 && celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y + 1][celda.x + 1]);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la última fila
        if (celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y + 1][celda.x]);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la esquina de abajo a la izquierda.
        if (celda.x > 0 && celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x - 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y + 1][celda.x - 1]);
                this.hijos.push(hijo);
            }         
        //Miro la celda de la izquierda si no estoy en la primera columna.
        if(celda.x>0){
            if (this.laberinto[celda.y][celda.x - 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, this.laberinto[celda.y][celda.x - 1 ]);
                this.hijos.push(hijo);
            }
        }
        //Miro si no estoy en la esquina superior izquierda.
        if (celda.x >0  && celda.y > 0)
            if (this.laberinto[celda.y - 1][celda.x - 1].tipo.tipo != 'OBSTACULO'){ 
                hijo = this.generarCelda(celda, this.laberinto[celda.y - 1][celda.x - 1]);
                this.hijos.push(hijo);
            }          
        return this.hijos;
    }

    generarCelda(celda : Celda,celdaHija:Celda): Celda{
        var hijo = new Celda;
        hijo = celdaHija;
        hijo.padre = celda;
        hijo.f = celda.g+hijo.h;
        return hijo;
    }

    nuevoLaberinto(size:number):void{
        var laberinto =new Array<Array<Celda>>();
        var celda :Celda;
        for(var i=0; i<size;i++){
            var row = new Array<Celda>();
            laberinto.push(row);
            for (var j = 0; j < size; j++){
                celda  = {
                    x: j, y: i, h: 0, g: 0, f: 0, tipo: { velocidad: 0.0, tipo: 'CAMPO', color: '#fff' }, padre: new Celda
                };
                row.push(celda);
            }
        }
        this.laberinto = laberinto;
        this.calcularHeuristicas();
    }

    buscar():void{
        this.abiertos.length=0;
        this.cerrados.length=0;
        this.abiertos.push(this.laberinto[0][0]);

        while(this.abiertos.length!=0){
            var celda = this.abiertos.pop();
            this.cerrados.push(celda);
            if (celda == this.laberinto[this.laberinto.length-1][this.laberinto.length-1]){
                console.log("YAY");
                console.log(this.cerrados);
            }
            else{
                this.explorarCelda(celda);
            }
        }
    }
}