import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
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
    user: any = new Users(0, '');
    users = [];
    selectedValue: number;

    constructor(public clientsService: ClientsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.clientsService.showClient(params['id']).subscribe(resClient => {
    this.client = new Client(resClient['data']['name'], resClient['data']['email'], resClient['data']['primary_number'], resClient['data']['secondary_number'], resClient['data']['address'], resClient['data']['zipcode'], resClient['data']['city'], resClient['data']['company_name'], resClient['data']['vat'], resClient['data']['company_type'], resClient['data']['user_id'], resClient['data']['industry_id']);
    this.id = params['id'];
        this.clientsService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < resUsers['data'].length; i++) {
                this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
                this.users.push(this.user);
            }
            this.selectedValue = this.users[0].value.toString();
        });

     console.log(this.users[0].value);
}));
}


    updateClient() {
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry_id));
        this.clientsService.updateClient(this.id, this.clients).subscribe(res => {
            this.clients.length = 0;
        console.log(res);
    });


    }

}
