import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from "@angular/router";
import { User } from './users.model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersViewComponent {
    title = 'app';
    user: User = new User('', '', '', '', '', '', '');
    //clients: Client[] = [];
    id: number;
    // _clientsArray: ClientsInterface[];
   // user: object;

    constructor(private _user: UsersService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._user.showUser(params['id']).subscribe(res => {
            this.user = new User(res['data']['name'], res['data']['email'], res['data']['password'], res['data']['address'], res['data']['work_number'], res['data']['personal_number'], res['data']['image_path']);
         this.id = params['id'];
          // this.user = res['data'];
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
