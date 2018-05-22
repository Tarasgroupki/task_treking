import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from './tasks.model';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksCreateComponent implements OnInit {
   // log(x) { console.log(x); }
    task: any = new Task('', '', 1, 1, 1, 1, 1, '');
    tasks: Task[] = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    users = [
        {value: 0, viewValue: ''}
    ];
    invoices = [
        {value: 0, viewValue: ''}
    ];
   // dateObj: object;
   // dateString: string;

    constructor(public _task_obj: TasksService) {

    }

    addTask() {
       // this.dateObj = new Date(this.task.deadline);
      //  this.dateString += this.dateObj.getFullYear() + "-";
       // this.dateString += (this.dateObj.getMonth()) + "-";
       // this.dateString += this.dateObj.getDate();
       // this.task.deadline = Date.parse(this.task.deadline);
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.user_assigned_id, this.task.user_created_id, this.task.client_id, this.task.invoice_id, this.task.deadline));
       // console.log(this.task.deadline);
        this._task_obj.createTask(this.tasks).subscribe(res => {
        this.task = res;
        console.log(res);
    });
    }
    ngOnInit() {
        this._task_obj.getUsers().subscribe(res => {
           for (let i = 0; i < res['data'].length; i++) {
               this.users[i]['value'] = res['data'][i].id;
               this.users[i]['viewValue'] = res['data'][i].name;
           }//console.log(this.users);
        });
        this._task_obj.getInvoices().subscribe(res => {
            for (let i = 0; i < res['data'].length; i++) {
                this.invoices[i]['value'] = res['data'][i].id;
                this.invoices[i]['viewValue'] = res['data'][i].status;
            }
        });
    }

}
