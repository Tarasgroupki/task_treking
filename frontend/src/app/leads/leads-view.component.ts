import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute } from "@angular/router";
//import { Lead } from './leads.model';

@Component({
  selector: 'app-leads-view',
  templateUrl: './leads-view.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsViewComponent {
    title = 'app';
   // lead: any = new Lead('', '', 1, 1, 1, 1, '');
   // leads: Lead[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    lead: object;

    constructor(private _lead: LeadsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._lead.showLead(params['id']).subscribe(res => {
         //   this.lead = new Lead(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['client_id'], res['data']['user_created_id'], res['data']['contact_date']);
            this.lead = res['data'];
            //  console.log(res);
        }) );
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
