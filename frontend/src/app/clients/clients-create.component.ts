import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from './clients.model';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit{
   // log(x) { console.log(x); }
    ///client: any = 1;
    client: any = new Client('', '', '', '', '', '', '', '', '', '', '', 1, 1);
    clients: Client[] = [];
    users = [
        {value: 0, viewValue: ''}
    ];

    constructor(public _client_obj: ClientsService) {

    }

    addClient(){
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number,this.client.address,this.client.zipcode,this.client.city,this.client.company_name,this.client.vat,this.client.industry,this.client.company_type,this.client.user_id,this.client.industry_id));
        console.log(this.clients);
        this._client_obj.createClient(this.clients).subscribe(res => {
        this.client = res;
        console.log(res);
    });
    }
    ngOnInit() {
        this._client_obj.getUsers().subscribe(res => {
           for(let i = 0; i < res['data'].length; i++) {
               this.users[i]['value'] = res['data'][i].id;
               this.users[i]['viewValue'] = res['data'][i].name;
           }
        });
    }
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
