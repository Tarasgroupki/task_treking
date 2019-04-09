import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
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
    user: any = new Users(0,'');
    users = [];
    lead: any = new Leads(0,'');
    leads = [];
   selected: number;

    constructor(public _sprint_obj: SprintsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._sprint_obj.showSprint(params['id']).subscribe(res => {
    this.date = new Date(res['data']['deadline']);
    this.sprint = new Sprint(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['lead_assigned_id'], res['data']['user_created_id'], this.date);
    this.id = params['id'];
     this._sprint_obj.getUsers().subscribe(res => {
         for (let i = 0; i < res['data'].length; i++) {
             console.log(this.id);
             this.user = new Users(res['data'][i].id, res['data'][i].name);
             this.users.push(this.user);
             console.log(this.users);
         }
        // this.selected = this.users[0].value;
         //console.log(this.users);
     });
        this._sprint_obj.getLeads().subscribe(res => {
            for (let i = 0; i < res['data'].length; i++) {
                console.log(this.id);
                this.lead = new Leads(res['data'][i].id, res['data'][i].title);
                this.leads.push(this.lead);
                console.log(this.leads);
            }
        });
    // this.selected = res['data']['user_assigned_id'];
    // document.getElementById("deadline").value = "2014/02/09";
    console.log(this.selected);
}));
}


    updateSprint() {
       // this.task.deadline = Date.parse(this.task.deadline);
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned_id, this.sprint.user_created_id, this.sprint.deadline));
        console.log(this.sprints[0]['deadline']);
       // this.selected = this.client.user_id;
        this._sprint_obj.updateSprint(this.id, this.sprints).subscribe(res => {
            this.sprints.length = 0;
        console.log(res);
    });


    }

}
