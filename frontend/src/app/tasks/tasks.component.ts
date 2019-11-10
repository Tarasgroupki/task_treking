import {Component, OnDestroy, OnInit} from '@angular/core';
import { TasksService } from './tasks.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
    title = 'app';
    tasks: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'sprint_assigned_id', 'user_created_id', 'client_id', 'invoice_id', 'deadline', 'created_at'];

    public sub: Subscription;

    constructor(private _tasks: TasksService) {}

    ngOnInit() {
       this.sub =  this._tasks.getTasks().subscribe(res => {
            this.tasks = res['data'];
            console.log(res);
            for(let i in this.tasks){
              if(this.tasks[i].status == 2) {
                 this.tasks[i].status = 'Виконано';
              }
              else if(this.tasks[i].status == 1) {
                  this.tasks[i].status = 'Виконується';
              }
              else {
                  this.tasks[i].status = 'Не виконується';
              }

             /* this._tasks.getUserById(this.tasks[i].user_created_id).subscribe( res => {
                 this.tasks[i].user_created_id = res['data'].name;
              });
              this._tasks.getSprintById(this.tasks[i].sprint_assigned_id).subscribe( res => {
                  this.tasks[i].sprint_assigned_id = res['data'].title;
              });
                this._tasks.getClientById(this.tasks[i].client_id).subscribe( res => {
                    this.tasks[i].client_id = res['data'].name;
                });*/
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
