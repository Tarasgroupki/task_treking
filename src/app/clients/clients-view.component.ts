import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    title = 'app';
  //  id: number;
    // _clientsArray: ClientsInterface[];
    client: object;

    constructor(private _client: ClientsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._client.showClient(params['id']).subscribe(res => {
            this.client = res['data'];
            //  console.log(res);
        }) );
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
