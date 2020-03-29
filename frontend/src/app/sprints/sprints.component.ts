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

    constructor(private sprintsService: SprintsService) {}

    ngOnInit() {
        this.sprintsService.getSprints().subscribe(resSprints => {
            this.sprints = resSprints['data'];
            for (const i of Object.keys(this.sprints)) {
                if (this.sprints[i].status === 2) {
                    this.sprints[i].status = 'Виконано';
                } else if (this.sprints[i].status === 1) {
                    this.sprints[i].status = 'Виконується';
                } else {
                    this.sprints[i].status = 'Не виконується';
                }
            }
        });
    }

}
