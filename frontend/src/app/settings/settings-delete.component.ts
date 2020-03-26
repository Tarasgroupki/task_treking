import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-settings-delete',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsDeleteComponent {
    title = 'app';
    role: object;

    constructor(private _role: SettingsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._role.deleteRole(params['id']).subscribe(resRole => {
            this.role = resRole;
            this._router.navigate(['roles']);
        }) );
    }

}
