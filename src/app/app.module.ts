import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { SopranoDetailComponent } from './soprano-detail.component';
import { SopranoComponent } from './soprano.component';
import { CeldaService } from './celda.service';
import { CeldaComponent } from './celda.component';
import { SopranoService } from './soprano.service';
import { DashboardComponent } from './dashboard.component';
import { SopranoSearchComponent } from './soprano-search.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SopranoDetailComponent,
    SopranoComponent,
    SopranoSearchComponent,
    CeldaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [SopranoService, CeldaService],
  bootstrap: [AppComponent]
})


export class AppModule { }
