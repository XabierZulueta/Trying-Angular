import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import { Celda } from './celda';

@Injectable()
export class CeldaService{
    private laberintoUrl = 'api/laberinto';

    constructor(private http: Http) { }

    getLaberinto(): Promise<Celda[][]>{
        return this.http.get(this.laberintoUrl)
            .toPromise()
            .then(response => response.json().data as Celda[][])
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getCelda(x:number, y:number): Promise<Celda>{
        const url = `${this.laberintoUrl}/${x}-${y}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Celda)
            .catch(this.handleError);
    }
}