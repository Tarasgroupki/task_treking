import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './users.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersCreateComponent implements OnInit{
   // log(x) { console.log(x); }
    ///client: any = 1;
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
    /*users = [
        {value: 0, viewValue: ''}
    ];*/

    constructor(public _user_obj: UsersService) {

    }

    addUser(){
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.user.image_path));
        console.log(this.users);
        this._user_obj.createUser(this.users).subscribe(res => {
        this.user = res;
        console.log(res);
    });
    }
    ngOnInit() {

    }
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
