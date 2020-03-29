import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usersroles',
  templateUrl: './users_roles.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersRolesComponent implements OnInit {
    title = 'app';
    id: number;
    roles: object;
    checkedRoles: object;
    selectedCheckbox = [];
    unselectedCheckbox = [];
    checkboxes = [];
  //  displayedColumns = ['id', 'name', 'email', 'password', 'address', 'work_number', 'personal_number', 'image_path'];

    constructor(private usersService: UsersService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe( params => this.usersService.getRoles(params['id']).subscribe(resRoles => {
            this.id = params['id'];
            this.roles = resRoles['data']['roles'];
            if (resRoles['data']['roles_id']) {
                this.checkedRoles = resRoles['data']['roles_id'];
            }
            console.log(this.checkedRoles);
        }));
    }
    onCkeckboxSelected(value) {
        if (this.selectedCheckbox.indexOf( value ) !== -1) {
            this.selectedCheckbox.splice(this.selectedCheckbox.indexOf( value ), 1);
        } else {
            this.selectedCheckbox.push(value);
        }
        console.log(this.selectedCheckbox);
    }
    onCkeckboxUnSelected(value) {
        if (this.unselectedCheckbox.indexOf( value ) !== -1) {
            this.unselectedCheckbox.splice(this.unselectedCheckbox.indexOf( value ), 1);
        } else {
            this.unselectedCheckbox.push(value);
        }
        console.log(this.unselectedCheckbox);
    }
    assignRole() {
        this.checkboxes.push(this.selectedCheckbox, this.unselectedCheckbox);
        this.usersService.AssignRoles(this.id, this.checkboxes).subscribe(resAssignRoles => {
            console.log(resAssignRoles);
        });
    }

}
