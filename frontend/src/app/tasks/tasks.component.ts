import {Component, OnDestroy, OnInit} from '@angular/core';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';

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

    constructor(private tasksService: TasksService) {}

    ngOnInit() {
       this.sub =  this.tasksService.getTasks().subscribe(resTasks => {
            this.tasks = resTasks['data'];

            for (const i of Object.keys(this.tasks)) {
              if (this.tasks[i].status === 2) {
                 this.tasks[i].status = 'Виконано';
              } else if (this.tasks[i].status === 1) {
                  this.tasks[i].status = 'Виконується';
              } else {
                  this.tasks[i].status = 'Не виконується';
              }
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
