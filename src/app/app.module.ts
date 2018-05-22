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
import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import {TasksViewComponent} from './tasks/tasks-view.component';
import { TasksCreateComponent } from './tasks/tasks-create.component';
import { TasksUpdateComponent } from './tasks/tasks-update.component';
import { TasksDeleteComponent } from './tasks/tasks-delete.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsService } from './leads/leads.service';
import {LeadsViewComponent} from './leads/leads-view.component';
import { LeadsCreateComponent } from './leads/leads-create.component';
import { LeadsUpdateComponent } from './leads/leads-update.component';
import { LeadsDeleteComponent } from './leads/leads-delete.component';
import { UsersService } from './users/users.service';
import { UsersComponent } from './users/users.component';
import {UsersViewComponent} from './users/users-view.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersUpdateComponent } from './users/users-update.component';
import { UsersDeleteComponent } from './users/users-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsViewComponent,
    ClientsCreateComponent,
    ClientsUpdateComponent,
    ClientsDeleteComponent,
    TasksComponent,
    TasksViewComponent,
    TasksCreateComponent,
    TasksUpdateComponent,
    TasksDeleteComponent,
    LeadsComponent,
    LeadsViewComponent,
    LeadsCreateComponent,
    LeadsUpdateComponent,
    LeadsDeleteComponent,
    UsersComponent,
    UsersViewComponent,
    UsersCreateComponent,
    UsersUpdateComponent,
    UsersDeleteComponent
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
        {
            path: 'tasks',
            component: TasksComponent
        },
        {
            path: 'tasks/:id',
            component: TasksViewComponent
        },
        {
            path: 'task/create',
            component: TasksCreateComponent
        },

        {
            path: 'tasks/add/:id',
            component: TasksUpdateComponent
        },
        {
            path: 'tasks/delete/:id',
            component: TasksDeleteComponent
        },
        {
            path: 'leads',
            component: LeadsComponent
        },
        {
            path: 'leads/:id',
            component: LeadsViewComponent
        },
        {
            path: 'lead/create',
            component: LeadsCreateComponent
        },
        {
            path: 'leads/add/:id',
            component: LeadsUpdateComponent
        },
        {
            path: 'leads/delete/:id',
            component: LeadsDeleteComponent
        },
        {
            path: 'users',
            component: UsersComponent
        },
        {
            path: 'users/:id',
            component: UsersViewComponent
        },
        {
            path: 'user/create',
            component: UsersCreateComponent
        },
        {
            path: 'users/add/:id',
            component: UsersUpdateComponent
        },
        {
            path: 'users/delete/:id',
            component: UsersDeleteComponent
        },
    ]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  //  AppRoutingModule
  ],
  providers: [ApiService, ClientsService, TasksService, LeadsService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
