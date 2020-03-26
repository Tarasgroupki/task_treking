import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { Sprint } from './sprints.model';
import { Users } from './users.model';
import { Leads } from './leads.model';

@Component({
  selector: 'app-sprints-create',
  templateUrl: './sprints-create.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsCreateComponent implements OnInit {
    sprint: any = new Sprint('', '', 1, 1, 1, '');
    sprints: Sprint[] = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users(0, '');
    users = [];
    lead: any = new Leads(0, '');
    leads = [];

    constructor(public _sprint_obj: SprintsService) {

    }

    addSprint() {
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned_id, this.sprint.user_created_id, this.sprint.deadline));
        this._sprint_obj.createSprint(this.sprints).subscribe(resSprint => {
        this.sprint = resSprint;
        this.sprints.length = 0;
    });
    }
    ngOnInit() {
        this._sprint_obj.getUsers().subscribe(resUsers => {
            for (let i = 0; i < resUsers['data'].length; i++) {
                this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
                this.users.push(this.user);
            }
        });
        this._sprint_obj.getLeads().subscribe(resLeads => {
            for (let i = 0; i < resLeads['data'].length; i++) {
                this.lead = new Leads(resLeads['data'][i].id, resLeads['data'][i].title);
                this.leads.push(this.lead);
            }
        });
    }

}
