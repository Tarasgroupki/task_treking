import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';
import { Users } from './users.model';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsUpdateComponent implements OnInit {
    id: number;
    client: Client = new Client('Taras', 'taras2andry@mail.ru', '0507212852', '0507212852', 'Kalush', '77300', 'Kalush', 'IFNTUOG', '321', 'University', 1, 1);
    clients: Client[] = [];
    user: any = new Users(0,'');
    users = [];
    selectedValue: number;

    constructor(public _client_obj: ClientsService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._client_obj.showClient(params['id']).subscribe(res => {
    this.client = new Client(res['data']['name'], res['data']['email'], res['data']['primary_number'], res['data']['secondary_number'], res['data']['address'], res['data']['zipcode'], res['data']['city'], res['data']['company_name'], res['data']['vat'], res['data']['company_type'], res['data']['user_id'], res['data']['industry_id']);
    this.id = params['id'];
        this._client_obj.getUsers().subscribe(res => {
            for (let i = 0; i < res['data'].length; i++) {
                this.user = new Users(res['data'][i].id, res['data'][i].name);
                this.users.push(this.user);
                console.log(this.users);
            }
            this.selectedValue = this.users[0].value.toString();
        });

     console.log(this.users[0].value);
}));
}


    updateClient() {
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry_id));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._client_obj.updateClient(this.id, this.clients).subscribe(res => {
            this.clients.length = 0;
        console.log(res);
    });


    }

}
