import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients/clients.service';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {ClientsViewComponent} from './clients/clients-view.component';
import {ClientsCreateComponent} from './clients/clients-create.component';
import {ClientsUpdateComponent} from './clients/clients-update.component';
import {ClientsDeleteComponent} from './clients/clients-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsViewComponent,
    ClientsCreateComponent,
    ClientsUpdateComponent,
    ClientsDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        {
            path: 'clients',
            component: ClientsComponent
        },
        {
            path: 'clients/create',
            component: ClientsCreateComponent
        },
        {
            path: 'clients/:id',
            component: ClientsViewComponent
        },
        {
            path: 'clients/add/:id',
            component: ClientsUpdateComponent
        },
        {
            path: 'clients/delete/:id',
            component: ClientsDeleteComponent
        },
    ]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  //  AppRoutingModule
  ],
  providers: [ApiService, ClientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
