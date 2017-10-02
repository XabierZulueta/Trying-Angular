import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[lado]',
  host:{
    '(mousemove)': 'onMouseMove($event)',
  }
})
export class LadoDirective {

  constructor(private el: ElementRef) { }

  onMouseMove(event){
    var tamanoActual = parseInt(this.el.nativeElement.style.fontSize +10);
    var nuevoTamano = Math.round(event.offsetX / 10);
    if (nuevoTamano <= 100 && nuevoTamano>=10)
      this.el.nativeElement.style.fontSize = nuevoTamano + "px";
  }
}
