import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-clients-delete',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsDeleteComponent {
    title = 'app';
    client: object;

    constructor(private _client: ClientsService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this._client.deleteClient(params['id']).subscribe(resClient => {
            this.client = resClient;
            this.router.navigate(['clients']);
        }) );
    }

}
