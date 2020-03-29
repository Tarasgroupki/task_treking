import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Sprints } from './sprints.model';
import { Users } from './users.model';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksCreateComponent implements OnInit {

    task: any = new Task('', '', 1, 1, 1, 1, 1, '');
    tasks: Task[] = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users(0, '');
    users = [];
    sprint: any = new Sprints(0, '');
    sprints = [];

    constructor(public tasksService: TasksService) {

    }

    addTask() {
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.user_assigned_id, this.task.sprint_assigned_id, this.task.user_created_id, this.task.client_id, this.task.deadline));
        this.tasksService.createTask(this.tasks).subscribe(resTask => {
        this.task = resTask;
        this.task.length = 0;
    });
    }
    ngOnInit() {
        this.tasksService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < resUsers['data'].length; i++) {
                this.user = new Users(resUsers['data'][i].id, resUsers['data'][i].name);
                this.users.push(this.user);
            }
        });
        this.tasksService.getSprints().subscribe(resSprints => {
            for (let i = 0; i < resSprints['data'].length; i++) {
                this.sprint = new Users(resSprints['data'][i].id, resSprints['data'][i].title);
                this.sprints.push(this.sprint);
            }
        });
    }

}
