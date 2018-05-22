import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from "@angular/router";
//import { Client } from './clients.model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersViewComponent {
    title = 'app';
   // client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1, 1);
    //clients: Client[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    user: object;

    constructor(private _user: UsersService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._user.showUser(params['id']).subscribe(res => {
          //  this.client = new Client(res['data']['name'], res['data']['email'], res['data']['primary_number'], res['data']['secondary_number'], res['data']['address'], res['data']['zipcode'], res['data']['city'], res['data']['company_name'], res['data']['vat'], res['data']['industry'], res['data']['company_type'], res['data']['user_id'], res['data']['industry_id']);
           this.user = res['data'];
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
