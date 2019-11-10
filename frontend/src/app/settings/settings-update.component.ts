import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Roles } from './settings.model';
import { Permissions } from './permissions.model';
import { ActivatedRoute } from '@angular/router';
import {Lead} from '../leads/leads.model';

@Component({
    selector: 'app-settings-update',
    templateUrl: './settings-update.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsUpdateComponent implements OnInit {
    id: number;
    role: any = new Roles('');
    roles: Roles[] = [];
    permissions: object;
    checked_permissions: object;
    selected_checkbox = [];
    unselected_checkbox = [];
    role_perm = [];
    // unselected_checkbox = [];
    // perm: any = new Permissions([]);
    // permission: Permissions[] = [];
   // permissions: object;

    constructor(public _setting_obj: SettingsService, private route: ActivatedRoute) {

    }
    updateRole() {
        //this.permission.push(new Permissions(this.perm.name));
        this.roles.push(this.role.name);
        this.role_perm.push(this.selected_checkbox, this.unselected_checkbox, this.roles);
       //this.role_perm.push(this.roles, this.selected_checkbox);
        console.log(this.role_perm);
        this._setting_obj.updateRole(this.id, this.role_perm).subscribe(res => {
            this.role = res;
            console.log(res);
        });
    }
    ngOnInit() {
        this.route.params.subscribe( params => this._setting_obj.showRole(params['id']).subscribe(res => {
            this.role = new Roles(res['data']['name']);
            this.id = params['id'];
        }));
        this.route.params.subscribe( params => this._setting_obj.getOnePermission(params['id']).subscribe(res => {
            this.id = params['id'];
            this.permissions = res['data']['permissions'];
            console.log(this.permissions);
            if(res['data']['permissions_id']) {
                this.checked_permissions = res['data']['permissions_id'];
                console.log(this.checked_permissions);
            }
        }));
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
    onCkeckboxUnSelected(value) {
        if(this.unselected_checkbox.indexOf( value ) != -1) {
            this.unselected_checkbox.splice(this.unselected_checkbox.indexOf( value ), 1);
        }
        else {
            this.unselected_checkbox.push(value);
        }
        console.log(this.unselected_checkbox);
    }

}
