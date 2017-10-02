import { Tipo } from './tipo';

export class Celda{
    x : number;
    y : number;
    h : number;
    g : number;
    f : number;
    tipo : Tipo;
    padre: Celda;

}