import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TokenInterceptorService } from './token-interceptor.service';
import { routes } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { LeadsModule } from './leads/leads.module';
import { SprintsModule } from './sprints/sprints.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { NotFoundModule } from './not-found/not-found.module';


@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    AuthModule,
    ClientsModule,
    LeadsModule,
    SprintsModule,
    TasksModule,
    SettingsModule,
    UsersModule,
    NotFoundModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ApiService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
