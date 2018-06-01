import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from './tasks.model';

@Component({
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksUpdateComponent implements OnInit {
    id: number;
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
   selected: number;

    constructor(public _task_obj: TasksService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._task_obj.showTask(params['id']).subscribe(res => {
    this.task = new Task(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['user_created_id'], res['data']['client_id'], res['data']['invoice_id'], res['data']['deadline']);
    this.id = params['id'];
     this._task_obj.getUsers().subscribe(res => {
         for(let i = 0; i < res['data'].length; i++) {
             this.users[i]['value'] = res['data'][i].id;
             this.users[i]['viewValue'] = res['data'][i].name;
         }
         this.selected = this.users[0].value;
         //console.log(this.users);
     });
     this._task_obj.getInvoices().subscribe(res => {
         for(let i = 0; i < res['data'].length; i++) {
             this.invoices[i]['value'] = res['data'][i].id;
             this.invoices[i]['viewValue'] = res['data'][i].status;
         }
     });
    // this.selected = res['data']['user_assigned_id'];
    // document.getElementById("deadline").value = "2014/02/09";
    console.log(this.selected);
}));
}


    updateTask() {
       // this.task.deadline = Date.parse(this.task.deadline);
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.user_assigned_id,this.task.user_created_id,this.task.client_id,this.task.invoice_id,this.task.deadline));
        console.log(this.tasks[0]['deadline']);
       // this.selected = this.client.user_id;
        this._task_obj.updateTask(this.id, this.tasks).subscribe(res => {
        console.log(res);
    });


    }

}
