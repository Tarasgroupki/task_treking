import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersViewComponent {
    title = 'app';
    user: User = new User('', '', '', '', '', '', '');
    id: number;

    constructor(private usersService: UsersService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.usersService.showUser(params['id']).subscribe(resUser => {
            this.user = new User(resUser['data']['name'], resUser['data']['email'], resUser['data']['password'], resUser['data']['address'], resUser['data']['work_number'], resUser['data']['personal_number'], resUser['data']['image_path']);
         this.id = params['id'];
        }) );
    }

}
