import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
    selector: 'app-users-profile',
    templateUrl: './users-profile.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersProfileComponent implements OnInit {
    id: number;
    public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];
    selectedFile = null;
    filename = null;
    roles = [];
    role_list: string;

    constructor(public _user_obj: UsersService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        //console.log(this.LogginningData);
        for ( let i = 0; i < this.LogginningData['user']['roles'].length;i++){
            this.roles[i] = this.LogginningData['user']['roles'][i]['name'];
        }
        this.role_list = this.roles.join();
      //  console.log(this.roles);
        this._user_obj.showUserProfile(this.LogginningData['user']['id']).subscribe(res => {
 this.user = new User(res['data']['name'], res['data']['email'], res['data']['password'], res['data']['address'], res['data']['work_number'], res['data']['personal_number'], res['data']['image_path']);
        });
    }
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

    updateUser() {
        if (this.selectedFile != null) {
            const fd = new FormData();
            fd.append('image_path', this.selectedFile, this.selectedFile.name);
        this._user_obj.fileUpload(fd).subscribe(res => {
            console.log(res);
        });
        this.filename = this.selectedFile.name;
      // this.LogginningData['user']['imgage_path'] = this.filename;
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        this._user_obj.updateProfileUser(this.LogginningData['user']['id'], this.users).subscribe(res => { this.user.image_path = res['data']['image_path'];
            this.users.length = 0;
            console.log(res);
        });


    }

}
