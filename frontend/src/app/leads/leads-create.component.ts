import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { Lead } from './leads.model';
import { Users } from './users.model';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit {
    lead: any = new Lead('', '', 1, 1, 1, 1, '');
    leads: Lead[] = [];
    user: any = new Users(0, '');
    users = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    loggedIn: object;

    constructor(public leadsService: LeadsService) {

    }

    addLead() {
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned_id, this.lead.client_id, this.lead.user_created_id, this.lead.contact_date));
        this.loggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
        this.leadsService.createLead({arr: this.leads}).subscribe(res => {
        this.lead = res;
        this.leads.length = 0;
    });
    }
    ngOnInit() {
        this.leadsService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < resUsers['data'].length; i++) {
                this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
                this.users.push(this.user);
            }
        });
    }
}
