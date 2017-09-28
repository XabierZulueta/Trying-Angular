import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Soprano } from './soprano';
import { SopranoService } from './soprano.service';


@Component({
template: `
<h2>Los sopranos</h2>
<div>
<label>Soprano:</label>
<input #sopranoNombre />
<input #sopranoEdad />
<button class="btn btn-default" (click)="add(sopranoNombre.value, sopranoEdad.value); sopranoNombre.value='';sopranoEdad.value='' ">
  Add
</button>
</div>
<ul class="sopranos">
  <li *ngFor="let soprano of sopranos"
    [class.selected]="soprano === selectedSoprano"
    (click)="onSelect(soprano)">
    <span class="badge">{{soprano.edad}}</span> {{soprano.nombre}}
    <a class="delete"
    (click)="delete(soprano); $event.stopPropagation()">
      <span class="glyphicon glyphicon-remove"></span>
    </a>
  </li>
</ul>
<div *ngIf="selectedSoprano">
  <h2>
    {{selectedSoprano.nombre | uppercase}} es un buen soprano
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
`,
  selector: 'my-sopranos',
  styleUrls: ['./app.component.css']
})

export class SopranoComponent implements OnInit{

  sopranos :Soprano[];
  selectedSoprano : Soprano;

  onSelect(soprano: Soprano):void{
    this.selectedSoprano = soprano;
  }

  constructor(private router: Router,
        private sopranoService: SopranoService){}

  getSopranosSlowly():void{
    this.sopranoService.getSopranosSlowly().then(sopranos=>this.sopranos = sopranos);
  }

  getSopranos():void{
    this.sopranoService.getSopranos().then(sopranos=>this.sopranos = sopranos);
  }

  ngOnInit(): void{
    this.getSopranos();
  }

  gotoDetail():void{
    this.router.navigate(['/detail', this.selectedSoprano.id]);
  }

  add(nombre : string, edad:number) : void{
    nombre=nombre.trim();
    if(!nombre){return;}
    this.sopranoService.create(nombre, edad)
        .then(soprano=>{
          this.sopranos.push(soprano);
          this.selectedSoprano = null;
        })
  }

  delete(soprano: Soprano): void {
    this.sopranoService
        .delete(soprano.id)
        .then(() => {
          this.sopranos = this.sopranos.filter(h => h !== soprano);
          if (this.selectedSoprano === soprano) { this.selectedSoprano = null; }
        });
  }
}
