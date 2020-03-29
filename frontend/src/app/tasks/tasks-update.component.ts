import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
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
    user: any = new Users(0, '');
    users = [];
    sprint: any = new Users(0, '');
    sprints = [];
    selected: number;

    constructor(public tasksService: TasksService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.tasksService.showTask(params['id']).subscribe(resTask => {
    this.date = new Date(resTask['data']['deadline']);
    this.task = new Task(resTask['data']['title'], resTask['data']['description'], resTask['data']['status'], resTask['data']['user_assigned_id'], resTask['data']['sprint_assigned_id'], resTask['data']['user_created_id'], resTask['data']['client_id'], this.date);
    this.id = params['id'];
     this.tasksService.getUsers().subscribe(resUsers => {
         for (let i = 0; i < resUsers['data'].length; i++) {
             this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
             this.users.push(this.user);
         }
     });
     this.tasksService.getSprints().subscribe(resSprints => {
         for (let i = 0; i < resSprints['data'].length; i++) {
             this.sprint = new Sprints(resSprints['data'][i].id, resSprints['data'][i].title);
             this.sprints.push(this.sprint);
         }
     });
    console.log(this.selected);
}));
}

    updateTask() {
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.user_assigned_id, this.task.sprint_assigned_id, this.task.user_created_id, this.task.client_id, this.task.deadline));
        this.tasksService.updateTask(this.id, this.tasks).subscribe(() => {
            this.tasks.length = 0;
    });


    }

}
