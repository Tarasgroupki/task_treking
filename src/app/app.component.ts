import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {ClientsInterface} from './clients-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 // providers: [ApiService]
})
export class AppComponent {
  title = 'app';
 // _clientsArray: ClientsInterface[];
 /* clients: object;
  constructor(private _clients: ApiService) {}

  ngOnInit() {
    this._clients.getClients().subscribe(res => {
      this.clients = res;
    });
  }*/
 /* getClients(): void {
    this.apiService.getClients().subscribe(
        resultArray => this._clientsArray = resultArray,
        error => console.log('Error ::' + error)
    )
  }

  ngOnInit(): void {
    this.getClients();
  }*/
}
