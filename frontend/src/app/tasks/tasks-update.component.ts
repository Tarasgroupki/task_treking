import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from './tasks.model';
import { Sprints } from './sprints.model';
import {Users} from '../leads/users.model';

@Component({
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksUpdateComponent implements OnInit {
    id: number;
    task: any = new Task('', '', 1, 1, 1, 1, 1, '');
    tasks: Task[] = [];
    date: any;
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users(0,'');
    users = [];
    sprint: any = new Users(0,'');
    sprints = [];
   selected: number;

    constructor(public _task_obj: TasksService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._task_obj.showTask(params['id']).subscribe(res => {
    this.date = new Date(res['data']['deadline']);
    this.task = new Task(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['sprint_assigned_id'], res['data']['user_created_id'], res['data']['client_id'], this.date);
    this.id = params['id'];
     this._task_obj.getUsers().subscribe(res => {
         for (let i = 0; i < res['data'].length; i++) {
             console.log(this.id);
             this.user = new Users(res['data'][i].id, res['data'][i].name);
             this.users.push(this.user);
             console.log(this.users);
         }
     });
     this._task_obj.getSprints().subscribe(res => {
         for (let i = 0; i < res['data'].length; i++) {
             console.log(this.id);
             this.sprint = new Sprints(res['data'][i].id, res['data'][i].title);
             this.sprints.push(this.sprint);
             console.log(this.sprints);
         }
     });
    // this.selected = res['data']['user_assigned_id'];
    // document.getElementById("deadline").value = "2014/02/09";
    console.log(this.selected);
}));
}


    updateTask() {
       // this.task.deadline = Date.parse(this.task.deadline);
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.user_assigned_id, this.task.sprint_assigned_id, this.task.user_created_id, this.task.client_id, this.task.deadline));
        console.log(this.tasks[0]['deadline']);
       // this.selected = this.client.user_id;
        this._task_obj.updateTask(this.id, this.tasks).subscribe(res => {
            this.tasks.length = 0;
        console.log(res);
    });


    }

}
