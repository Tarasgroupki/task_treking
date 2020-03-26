import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
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
    permissions: object;

    constructor(public _setting_obj: SettingsService) {

    }
    addRole() {
        this.roles.push(new Roles(this.role.name));
        this.role_perm.push(this.roles, this.selected_checkbox);
        this._setting_obj.createRole(this.role_perm).subscribe(resRole => {
        this.role = resRole;
    });
    }
    ngOnInit() {
        this._setting_obj.getPermissions().subscribe(res => {
            this.permissions = res['data'];
            console.log(this.permissions);
        });
    }
    onCkeckboxSelected(value) {
        if (this.selected_checkbox.indexOf( value ) != -1) {
            this.selected_checkbox.splice(this.selected_checkbox.indexOf( value ), 1);
        } else {
            this.selected_checkbox.push(value);
        }
        console.log(this.selected_checkbox);
    }

}
