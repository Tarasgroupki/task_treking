import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute } from '@angular/router';
import { Lead } from './leads.model';
import { Users } from './users.model';

@Component({
  selector: 'app-leads-update',
  templateUrl: './leads-update.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsUpdateComponent implements OnInit {
    id: number;
    lead: any = new Lead('', '', 1, 1, 1, 1, '');
    leads: Lead[] = [];
    date: any;
    user: any = new Users(0, '');
    users = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    selected: number;


    constructor(public leadsService: LeadsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.leadsService.showLead(params['id']).subscribe(resLead => {
        this.date = new Date(resLead['data']['contact_date']);
        console.log(this.date);
    this.lead = new Lead(resLead['data']['title'], resLead['data']['description'], resLead['data']['status'], resLead['data']['user_assigned_id'], resLead['data']['client_id'], resLead['data']['user_created_id'], this.date);
    this.id = params['id'];
     this.leadsService.getUsers().subscribe(resUsers => {
         for (let i = 0; i < resUsers['data'].length; i++) {
             this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
             this.users.push(this.user);
         }
         this.selected = this.users[0].value;
     });
}));
}


    updateLead() {
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned_id, this.lead.client_id, this.lead.user_created_id, this.lead.contact_date));
        this.leadsService.updateLead(this.id, this.leads).subscribe(() => {
            this.leads.length = 0;
    });


    }

}
