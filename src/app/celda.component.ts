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
    cerrados :Celda[];

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
        this.cerrados = new Array<Celda>()
    }

    changeTipo(celda : Celda, laberinto: Celda[][]): void{
        switch(celda.tipo.tipo){
            case 'CAMPO':
                celda.tipo.tipo = 'DESIERTO';
                celda.tipo.color = '#f0ad4e';
                celda.tipo.velocidad = 0.25;
                break;
            case 'DESIERTO': 
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
                if (this.laberinto[i][j].tipo.tipo=='CAMPO'){
                    this.laberinto[i][j].h = this.calcularHeuristica(this.laberinto[i][j]);
                    this.laberinto[i][j].f = this.laberinto[i][j].h + this.laberinto[i][j].g;
                }
                else{
                    this.laberinto[i][j].h = 0;
                    this.laberinto[i][j].f = 0;
                }
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
                this.abiertos.sort(function (a, b){
                    return a.f-b.f;
                });
            }
        }

    }

    generarHijos(celda : Celda) : Celda[]{
        var hijo = new Celda;
        this.hijos = new Array<Celda>();
        //Miro la celda de arriba si no estoy en la primera fila.
        if(celda.y>0){
            if (this.laberinto[celda.y-1][celda.x].tipo.tipo != 'OBSTACULO'){
                hijo = this.generarCelda(celda, -1,0);
                this.hijos.push(hijo);
            }
        }
        //Miro si no estoy en la esquina superior derecha.
        if (celda.x < this.laberinto.length - 1 && celda.y > 0)
            if (this.laberinto[celda.y - 1][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda,-1,1);
                this.hijos.push(hijo);
            } 
        //Miro si no estoy en la última columna
        if (celda.x < this.laberinto.length - 1)
            if (this.laberinto[celda.y][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda,0,1);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la esquina de abajo a la derecha.
        if (celda.x < this.laberinto.length - 1 && celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x + 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, 1,1);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la última fila
        if (celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda,+1,0);
                this.hijos.push(hijo);
            }
        //Miro si no estoy en la esquina de abajo a la izquierda.
        if (celda.x > 0 && celda.y < this.laberinto.length - 1)
            if (this.laberinto[celda.y + 1][celda.x - 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, 1,-1);
                this.hijos.push(hijo);
            }         
        //Miro la celda de la izquierda si no estoy en la primera columna.
        if(celda.x>0){
            if (this.laberinto[celda.y][celda.x - 1].tipo.tipo != 'OBSTACULO') {
                hijo = this.generarCelda(celda, 0,-1);
                this.hijos.push(hijo);
            }
        }
        //Miro si no estoy en la esquina superior izquierda.
        if (celda.x >0  && celda.y > 0)
            if (this.laberinto[celda.y - 1][celda.x - 1].tipo.tipo != 'OBSTACULO'){ 
                hijo = this.generarCelda(celda,-1,-1);
                this.hijos.push(hijo);
            }          
        return this.hijos;
    }

    generarCelda(celda : Celda,y:number, x:number): Celda{
        var hijo = new Celda;
        hijo =  null;
        hijo = {x:celda.x  + x,y:celda.y+y, 
            h: this.calcularHeuristica(this.laberinto[celda.y+y][celda.x+x]),
            g: 1/this.laberinto[celda.y + y][celda.x + x].tipo.velocidad +celda.g,
            f: 0, tipo: this.laberinto[celda.y + y][celda.x + x].tipo,
            padre: celda,
            cerrado: false,
            solucion:false
             };
             hijo.f = hijo.g+hijo.h;
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
                    x: j, y: i, h: 0, g: 0, f: 0, 
                    tipo: { velocidad: 1.0, tipo: 'CAMPO', color: '#fff' }, 
                    padre: new Celda, cerrado : false, solucion: false
                };
                row.push(celda);
            }
        }
        this.laberinto = laberinto;
        this.calcularHeuristicas();
    }

    limpiarLaberinto():void{
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                this.laberinto[j][i] = {
                    x: j, y: i, h: 0, g: 0, f: 0,
                    tipo: { velocidad: 1.0, tipo: 'CAMPO', color: '#fff' },
                    padre: new Celda, cerrado: false, solucion: false
                };
            }
        }
    }

    buscar():void{
        this.abiertos.length=0;
        this.cerrados.length=0;
        this.abiertos.push(this.laberinto[0][0]);

        while(this.abiertos.length!=0){
            var celda = this.abiertos.shift();
            this.cerrados.push(celda);
            celda.cerrado = true;
            if (celda.x == this.laberinto[this.laberinto.length-1][this.laberinto.length-1].x
                && celda.y == this.laberinto[this.laberinto.length - 1][this.laberinto.length - 1].y){
                console.log(this.cerrados);
                this.laberinto[0][0].padre= null;
                    this.generarSolucion(celda);
                console.log(this.cerrados);
                return;
            }
            else{
                this.explorarCelda(celda);
            }
        }
    }

    generarSolucion(celda : Celda):void{
        if(celda.padre!=null)
            this.generarSolucion(celda.padre);
        celda.solucion = true;
        celda.tipo.color = "#f0ad4e";
    }
}