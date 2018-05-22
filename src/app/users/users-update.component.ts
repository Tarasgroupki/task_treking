import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersUpdateComponent implements OnInit {
    id: number;
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
  //  selectedValue: number;

    constructor(public _user_obj: UsersService,private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._user_obj.showUser(params['id']).subscribe(res => {
    this.user = new User(res['data']['name'], res['data']['email'], res['data']['password'], res['data']['address'], res['data']['work_number'], res['data']['personal_number'], res['data']['image_path']);
    this.id = params['id'];
     /*this._user_obj.getUsers().subscribe(res => {
         for(let i = 0; i < res['data'].length; i++) {
             this.users[i]['value'] = res['data'][i].id;
             this.users[i]['viewValue'] = res['data'][i].name;
         }*/
        // console.log(res);
        // this.selectedValue = this.users[0].value;
     }));
     //this.selectedValue = this.users[0].value.toString();
  //   console.log(this.users[0].value);
}


   updateUser() {
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.user.image_path));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._user_obj.updateUser(this.id, this.users).subscribe(res => {
        console.log(res);
    });


    }

}
