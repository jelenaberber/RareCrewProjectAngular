import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './employees/components/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HoursPipe} from "./employees/pipes/hours.pipe";


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HoursPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
