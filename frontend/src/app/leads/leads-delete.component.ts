import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-leads-delete',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsDeleteComponent {
    title = 'app';
    lead: object;

    constructor(private _lead: LeadsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._lead.deleteLead(params['id']).subscribe(res => {
            this.lead = res;
            this._router.navigate(['leads']);
        }) );
    }

}
