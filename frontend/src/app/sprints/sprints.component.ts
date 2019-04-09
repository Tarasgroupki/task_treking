import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
    title = 'app';
    sprints: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'lead_assigned_id', 'user_created_id', 'deadline', 'created_at'];

    constructor(private _sprints: SprintsService) {}

    ngOnInit() {
        this._sprints.getSprints().subscribe(res => {
            this.sprints = res['data'];
            console.log(res);
        });
    }

}
