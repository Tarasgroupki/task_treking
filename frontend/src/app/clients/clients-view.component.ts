import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute } from "@angular/router";
//import { Client } from './clients.model';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    title = 'app';
   // client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1, 1);
    //clients: Client[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    client: object;

    constructor(private _client: ClientsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._client.showClient(params['id']).subscribe(res => {
          //  this.client = new Client(res['data']['name'], res['data']['email'], res['data']['primary_number'], res['data']['secondary_number'], res['data']['address'], res['data']['zipcode'], res['data']['city'], res['data']['company_name'], res['data']['vat'], res['data']['industry'], res['data']['company_type'], res['data']['user_id'], res['data']['industry_id']);
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
