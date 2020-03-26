import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    title = 'app';
    roles: object;
    displayedColumns = ['id', 'name', 'guard_name'];

    constructor(private _roles: SettingsService) {}

    ngOnInit() {
        this._roles.getRoles().subscribe(resRoles => {
            this.roles = resRoles['data'];
        });
    }

}
