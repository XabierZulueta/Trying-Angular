import { Component, OnInit } from '@angular/core';

import { Soprano } from './soprano';
import { SopranoService } from './soprano.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls : ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  sopranos:Soprano[] = [];
  constructor(private sopranoService: SopranoService){}

  ngOnInit():void{
    this.sopranoService.getSopranos().then(sopranos => this.sopranos = sopranos.slice(0,4));
  }
 }
