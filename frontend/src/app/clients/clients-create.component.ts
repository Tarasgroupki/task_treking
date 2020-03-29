import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Client } from './clients.model';
import { Users } from './users.model';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit {
    client: any = new Client('', '', '', '', '', '', '', '', '', '', 1, 1);
    clients: Client[] = [];
    user: any = new Users(0, '');
    users = [];

    constructor(public clientsService: ClientsService) {

    }

    addClient() {
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry_id));

        this.clientsService.createClient(this.clients).subscribe(resClient => {
        this.client = resClient;
        this.clients.length = 0;
    });
    }
    ngOnInit() {
        this.clientsService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < resUsers['data'].length; i++) {
                this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
                this.users.push(this.user);
            }
        });
    }

}
