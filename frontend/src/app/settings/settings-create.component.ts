import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Roles } from './settings.model';
import { Permissions } from './permissions.model';

@Component({
  selector: 'app-settings-create',
  templateUrl: './settings-create.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsCreateComponent implements OnInit {
    role: any = new Roles('');
    roles: Roles[] = [];
    selected_checkbox = [];
    role_perm = [];
   // unselected_checkbox = [];
   // perm: any = new Permissions([]);
   // permission: Permissions[] = [];
    permissions: object;

    constructor(public _setting_obj: SettingsService) {

    }
    addRole() {
        //this.permission.push(new Permissions(this.perm.name));
        this.roles.push(new Roles(this.role.name));
        this.role_perm.push(this.roles, this.selected_checkbox);
        console.log(this.roles);
        this._setting_obj.createRole(this.role_perm).subscribe(res => {
        this.role = res;
        console.log(res);
    });
    }
    ngOnInit() {
        this._setting_obj.getPermissions().subscribe(res =>{
            this.permissions = res['data'];
            console.log(this.permissions);
        });
    }
    onCkeckboxSelected(value) {
        if(this.selected_checkbox.indexOf( value ) != -1) {
            this.selected_checkbox.splice(this.selected_checkbox.indexOf( value ), 1);
        }
        else {
            this.selected_checkbox.push(value);
        }
        console.log(this.selected_checkbox);
    }

}
