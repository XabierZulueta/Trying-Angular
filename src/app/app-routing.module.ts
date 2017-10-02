import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { SopranoComponent }      from './soprano.component';
import { SopranoDetailComponent }  from './soprano-detail.component';
import { CeldaComponent } from './celda.component';
import { ManzaComponent } from './manza.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'detail/:id', component: SopranoDetailComponent },
  { path: 'sopranos',     component: SopranoComponent },
  { path: 'laberinto', component: CeldaComponent},
  { path: 'manza', component: ManzaComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
