import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    title = 'app';
    tasks: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'user_assigned_id', 'user_created_id', 'client_id', 'invoice_id', 'deadline', 'created_at'];

    constructor(private _tasks: TasksService) {}

    ngOnInit() {
        this._tasks.getTasks().subscribe(res => {
            this.tasks = res['data'];
            console.log(res);
        });
    }

}
