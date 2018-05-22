import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Lead } from './leads.model';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit {
   // log(x) { console.log(x); }
    ///client: any = 1;
    lead: any = new Lead('', '', 1, 1, 1, 1, '');
    leads: Lead[] = [];
    users = [
        {value: 0, viewValue: ''}
    ];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];

    constructor(public _lead_obj: LeadsService) {

    }

    addLead(){
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned_id, this.lead.client_id, this.lead.user_created_id, this.lead.contact_date));
        console.log(this.leads);
        this._lead_obj.createLead({arr: this.leads}).subscribe(res => {
        this.lead = res;
        console.log(res);
    });
    }
    ngOnInit() {
        this._lead_obj.getUsers().subscribe(res => {
           for(let i = 0; i < res['data'].length; i++) {
               this.users[i]['value'] = res['data'][i].id;
               this.users[i]['viewValue'] = res['data'][i].name;
           }
        });
    }
}
