import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
    title = 'app';
    leads: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'user_assigned_id', 'client_id', 'user_created_id', 'contact_date', 'created_at'];

    constructor(private _leads: LeadsService) {}

    ngOnInit() {
        this._leads.getLeads().subscribe(res => {
            this.leads = res['data'];
            console.log(res);
        });
    }

}
