import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { SopranoDetailComponent } from './soprano-detail.component';
import { SopranoComponent } from './soprano.component';
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
    SopranoSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  providers: [SopranoService],
  bootstrap: [AppComponent]
})


export class AppModule { }
