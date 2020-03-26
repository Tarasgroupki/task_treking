import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-sprints-delete',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsDeleteComponent {
    title = 'app';
    sprint: object;

    constructor(private _sprint: SprintsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._sprint.deleteSprint(params['id']).subscribe(resSprint => {
            this.sprint = resSprint;
            this._router.navigate(['sprints']);
        }) );
    }

}
