import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksDeleteComponent {
    title = 'app';
    task: object;

    constructor(private _task: TasksService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._task.deleteTask(params['id']).subscribe(resTask => {
            this.task = resTask;
            this._router.navigate(['tasks']);
        }) );
    }

}
