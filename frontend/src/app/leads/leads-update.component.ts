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
    user: any = new Users(0,'');
    users = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    selected: number;


    constructor(public _lead_obj: LeadsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._lead_obj.showLead(params['id']).subscribe(res => {
        this.date = new Date(res['data']['contact_date']);
      //  dateformat(this.date, 'DD.MM.YYYY');
        console.log(this.date);
    this.lead = new Lead(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['client_id'], res['data']['user_created_id'], this.date);
    this.id = params['id'];
     this._lead_obj.getUsers().subscribe(res => {
         /*this._lead_obj.showLead(this.id).subscribe(res => {

         });*/
         for (let i = 0; i < res['data'].length; i++) {
             console.log(this.id);
             this.user = new Users(res['data'][i].id, res['data'][i].name);
             this.users.push(this.user);
             console.log(this.users);
         }
         this.selected = this.users[0].value;
     });
     //this.selected = res['data']['user_id'];

     console.log(this.lead.contact_date);
}));
}


    updateLead() {
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned_id, this.lead.client_id, this.lead.user_created_id, this.lead.contact_date));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._lead_obj.updateLead(this.id, this.leads).subscribe(res => {
            this.leads.length = 0;
        console.log(res);
    });


    }

}
