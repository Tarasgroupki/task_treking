import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from './sprints.model';
import {Users} from '../leads/users.model';
import {Leads} from './leads.model';

@Component({
  selector: 'app-sprints-update',
  templateUrl: './sprints-update.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsUpdateComponent implements OnInit {
    id: number;
    sprint: any = new Sprint('', '', 1, 1, 1, '');
    sprints: Sprint[] = [];
    date: any;
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users(0, '');
    users = [];
    lead: any = new Leads(0, '');
    leads = [];
    selected: number;

    constructor(public sprintsService: SprintsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.sprintsService.showSprint(params['id']).subscribe(resSprint => {
    this.date = new Date(resSprint['data']['deadline']);
    this.sprint = new Sprint(resSprint['data']['title'], resSprint['data']['description'], resSprint['data']['status'], resSprint['data']['lead_assigned_id'], resSprint['data']['user_created_id'], this.date);
    this.id = params['id'];
     this.sprintsService.getUsers().subscribe(resUsers => {
         for (let i = 0; i < resUsers['data'].length; i++) {
             this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
             this.users.push(this.user);
         }
     });
        this.sprintsService.getLeads().subscribe(resLeads => {
            for (let i = 0; i < resLeads['data'].length; i++) {
                this.lead = new Leads(resLeads['data'][i].id, resLeads['data'][i].title);
                this.leads.push(this.lead);
            }
        });
    console.log(this.selected);
}));
}


    updateSprint() {
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned_id, this.sprint.user_created_id, this.sprint.deadline));
        console.log(this.sprints[0]['deadline']);
        this.sprintsService.updateSprint(this.id, this.sprints).subscribe(res => {
            this.sprints.length = 0;
        console.log(res);
    });


    }

}
