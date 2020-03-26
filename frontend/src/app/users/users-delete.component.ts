import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-users-delete',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersDeleteComponent {
    title = 'app';
    user: object;

    constructor(private _user: UsersService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._user.deleteUser(params['id']).subscribe(res => {
            this.user = res;
            this._router.navigate(['users']);
        }) );
    }

}
