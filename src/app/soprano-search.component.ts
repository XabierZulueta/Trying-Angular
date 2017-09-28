import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
 
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SopranoService } from './soprano.service';
import { Soprano } from './soprano';

@Component({
    selector: 'soprano-search',
    template: `  <div id="search-component">
    <h4>Buscador</h4>
    <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
    <div>
      <div *ngFor="let soprano of sopranos | async"
           (click)="gotoDetail(soprano)" class="search-result" >
        {{soprano.nombre}}
      </div>
    </div>
  </div>`,
    styleUrls: [ './app.component.css' ],
    providers: [SopranoService]
  })

  export class SopranoSearchComponent implements OnInit{
      sopranos: Observable<Soprano[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private sopranoService : SopranoService,
        private router: Router){}
        
    search(term:string):void{
        this.searchTerms.next(term);
    }

    ngOnInit():void{
        this.sopranos = this.searchTerms
                .debounceTime(100)
                .distinctUntilChanged()
                .switchMap(term => term
                        ? this.sopranoService.search(term)
                        : Observable.of<Soprano[]>([])    
                )
                .catch(error=>{
                    console.log(error);
                    return Observable.of<Soprano[]>([]);
                });
    }
    gotoDetail(soprano:Soprano):void{
      this.router.navigate(['/detail',soprano.id]);
    }
  }