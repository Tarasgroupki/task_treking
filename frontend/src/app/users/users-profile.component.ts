import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
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
    roleList: string;

    constructor(public usersService: UsersService, private route: ActivatedRoute, private authService: AuthService) {

    }
    ngOnInit() {
        for (let i = 0; i < this.LogginningData['user']['roles'].length; i++) {
            this.roles[i] = this.LogginningData['user']['roles'][i]['name'];
        }
        this.roleList = this.roles.join();
        this.usersService.showUserProfile(this.LogginningData['user']['id']).subscribe(resUserProfile => {
 this.user = new User(resUserProfile['data']['name'], resUserProfile['data']['email'], resUserProfile['data']['password'], resUserProfile['data']['address'], resUserProfile['data']['work_number'], resUserProfile['data']['personal_number'], resUserProfile['data']['image_path']);
        });
    }
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

    updateUser() {
        if (this.selectedFile !== null) {
            const fd = new FormData();
            fd.append('image_path', this.selectedFile, this.selectedFile.name);
        this.usersService.fileUpload(fd).subscribe(() => { });
        this.filename = this.selectedFile.name;
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        this.usersService.updateProfileUser((this.LogginningData['user']['id']) ? this.LogginningData['user']['id'] : this.authService.currentUser[0]['id'], this.users).subscribe(resProfileUser => {
          this.user.image_path = resProfileUser['data']['image_path'];
          this.users.length = 0;
        });


    }

}
