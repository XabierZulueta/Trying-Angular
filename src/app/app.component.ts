import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template:`
  <h1>{{title}}</h1>
  <nav>
    <a class="btn btn-default" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a class="btn btn-default" routerLink="/sopranos" routerLinkActive="active">Sopranos</a>
    <a class="btn btn-default" routerLink="/laberinto" routerLinkActive="active">Laberinto</a>
    <a class="btn btn-default" routerLink="/manza" routerLinkActive="active">Manza</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styleUrls:['./app.component.css']
})

export class AppComponent{
    title = 'Sopranos';
}
