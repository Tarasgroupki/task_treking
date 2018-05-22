import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from "@angular/router";
//import { Task } from './tasks.model';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksViewComponent {
    title = 'app';
   // task: any = new Task('', '', 1, 1, 1, 1, 1, '');
   // tasks: Task[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    task: object;

    constructor(private _task: TasksService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._task.showTask(params['id']).subscribe(res => {
           /* this.task = new Task(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['user_created_id'], res['data']['client_id'], res['data']['invoice_id'], res['data']['deadline']);*/
           this.task = res['data'];
            //  console.log(res);
        }) );
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
