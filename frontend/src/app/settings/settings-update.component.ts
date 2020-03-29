import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Roles } from './settings.model';
import { ActivatedRoute } from '@angular/router';

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
    checkedPermissions: object;
    selectedCheckbox = [];
    unselectedCheckbox = [];
    rolePerm = [];

    constructor(public settingsService: SettingsService, private route: ActivatedRoute) {

    }
    updateRole() {
        this.roles.push(this.role.name);
        this.rolePerm.push(this.selectedCheckbox, this.unselectedCheckbox, this.roles);
        console.log(this.rolePerm);
        this.settingsService.updateRole(this.id, this.rolePerm).subscribe(resRole => {
            this.role = resRole;
        });
    }
    ngOnInit() {
        this.route.params.subscribe( params => this.settingsService.showRole(params['id']).subscribe(resRole => {
            this.role = new Roles(resRole['data']['name']);
            this.id = params['id'];
        }));
        this.route.params.subscribe( params => this.settingsService.getOnePermission(params['id']).subscribe(resPermission => {
            this.id = params['id'];
            this.permissions = resPermission['data']['permissions'];
            console.log(this.permissions);
            if (resPermission['data']['permissions_id']) {
                this.checkedPermissions = resPermission['data']['permissions_id'];
                console.log(this.checkedPermissions);
            }
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

}
