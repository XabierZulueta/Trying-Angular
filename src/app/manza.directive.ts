import {Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector:'[colorauto]',
    host:{
        '(click)':'onClick($event)',
        '(mouseleave)': 'onMouseLeave($event)',
        '(mouseenter)': 'onMouseEnter($event)'
    }
})
export class ColorAuto {
    @Input() color: string; 
    @Input() colorMouse: string; 
    @Input() texto: string; 
    colores: any; textoTemp: string; 
    //Crea un 'atributo' que hace referencia a la etiqueta HTML
    constructor(private el: ElementRef){
        this.colores = { Azul: 'blue', Negro: 'black', 
                        Rojo: 'red', Verde: 'green' }; 
    } 
      //Cuando se produzcan las condiciones de (click), se llama aquí
    onClick() { } 
       //Cuando se produzcan las condiciones de (mouseenter), se llama aquí 
    onMouseEnter() { 
        this.el.nativeElement.style.color = this.colores[this.colorMouse];
        this.textoTemp = this.el.nativeElement.innerHTML;
        if (this.texto != '') 
        this.el.nativeElement.innerHTML = this.texto; 
    } 
          //Cuando se produzcan las condiciones de (mouseleave), se llama aquí 
    onMouseLeave() { 
        this.el.nativeElement.style.color = this.colores[this.color];
        this.el.nativeElement.innerHTML = this.textoTemp; 
    }
}