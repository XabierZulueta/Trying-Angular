import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Soprano } from './soprano';
import { SopranoService } from './soprano.service';

@Component({
  selector : 'soprano-detail',
  templateUrl:'./soprano-detail.component.html',
  styleUrls : ['./soprano-detail.component.css']
})
export class SopranoDetailComponent implements OnInit{
  soprano: Soprano;

  constructor(
    private sopranoService:SopranoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
  this.route.paramMap
    .switchMap((params: ParamMap) => this.sopranoService.getSoprano(+params.get('id')))
    .subscribe(soprano => this.soprano = soprano);
    }

  goBack():void{
    this.location.back();
  }

  save():void{
    this.sopranoService.update(this.soprano)
      .then(()=>this.goBack());
  }
}
