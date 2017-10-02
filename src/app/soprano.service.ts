import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Soprano } from './soprano';


@Injectable()
export class SopranoService{
  private sopranosUrl = 'api/sopranos';  // URL to web api

  constructor(private http: Http) { }

  getSopranos(): Promise<Soprano[]> {
  return this.http.get(this.sopranosUrl)
             .toPromise()
             .then(response => response.json().data as Soprano[])
             .catch(this.handleError);
  }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred', error); // for demo purposes only
   return Promise.reject(error.message || error);
 }

  getSopranosSlowly():Promise<Soprano[]>{
    return new Promise(resolve=>{
      setTimeout(() => resolve(this.getSopranos()), 2000);
    });
  }

  getSoprano(id : number): Promise<Soprano>{
  const url =`${this.sopranosUrl}/${id}`;
  return this.http.get(url)
     .toPromise()
     .then(response => response.json().data as Soprano)
     .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  
  update(soprano : Soprano):Promise<Soprano>{
    const url = `${this.sopranosUrl}/${soprano.id}`;
    return this.http
      .put(url, JSON.stringify(soprano), {headers: this.headers})
      .toPromise()
      .then(() => soprano)
      .catch(this.handleError);
  }

  create(nombre: string, edad:number): Promise<Soprano> {
    return this.http
      .post(this.sopranosUrl, JSON.stringify({nombre: nombre, edad:edad}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Soprano)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.sopranosUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  search(term:string) : Observable<Soprano[]>{
      return this.http.get(`api/sopranos/?nombre=${term}`)
        .map(response=>response.json().data as Soprano[]);
  }
  
}
