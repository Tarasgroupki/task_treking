import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    title = 'app';
    client: Client = new Client('', '', '', '', '', '', '', '', '', '', 1, 1);
    id: number;

    constructor(private _client: ClientsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._client.showClient(params['id']).subscribe(resClient => {
            this.client = new Client(resClient['data']['name'], resClient['data']['email'], resClient['data']['primary_number'], resClient['data']['secondary_number'], resClient['data']['address'], resClient['data']['zipcode'], resClient['data']['city'], resClient['data']['company_name'], resClient['data']['vat'], resClient['data']['company_type'], resClient['data']['user_id'], resClient['data']['industry_id']);
           this.id = params['id'];
        }) );
    }

}
