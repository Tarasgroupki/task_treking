import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsUpdateComponent implements OnInit {
    id: number;
    client: Client = new Client('Taras', 'taras2andry@mail.ru', '0507212852', '0507212852', 'Kalush', '77300', 'Kalush', 'IFNTUOG', '321', 'IT', 'University', 1, 1);
    clients: Client[] = [];
    users = [
        {value: 0, viewValue: ''}
    ];
    selected: number;

    constructor(public _client_obj: ClientsService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._client_obj.showClient(params['id']).subscribe(res => {
    this.client = new Client(res['data']['name'], res['data']['email'], res['data']['primary_number'], res['data']['secondary_number'], res['data']['address'], res['data']['zipcode'], res['data']['city'], res['data']['company_name'], res['data']['vat'], res['data']['industry'], res['data']['company_type'], res['data']['user_id'], res['data']['industry_id']);
    this.id = params['id'];
     this._client_obj.getUsers().subscribe(res => {
         for(let i = 0; i < res['data'].length; i++) {
             this.users[i]['value'] = res['data'][i].id;
             this.users[i]['viewValue'] = res['data'][i].name;
         }
     });
     this.selected = res['data']['user_id'];
   //  console.log(this.users);
}));
}


    updateClient() {
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.industry, this.client.company_type, this.client.user_id, this.client.industry_id));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._client_obj.updateClient(this.id, this.clients).subscribe(res => {
        console.log(res);
    });


    }

}
