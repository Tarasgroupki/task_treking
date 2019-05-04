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
            for(let i in this.sprints){
                if(this.sprints[i].status == 2) {
                    this.sprints[i].status = 'Виконано';
                }
                else if(this.sprints[i].status == 1) {
                    this.sprints[i].status = 'Виконується';
                }
                else {
                    this.sprints[i].status = 'Не виконується';
                }
                this._sprints.getUserById(this.sprints[i].user_created_id).subscribe( res => {
                    this.sprints[i].user_created_id = res['data'].name;
                });
                this._sprints.getLeadById(this.sprints[i].lead_assigned_id).subscribe( res => {
                    this.sprints[i].lead_assigned_id = res['data'].title;
                });
            }
        });
    }

}
