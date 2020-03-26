import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getPermissions() {
      return this._http.get('http://localhost:8040/api/permissions', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  getOnePermission(id: number) {
      return this._http.get('http://localhost:8040/api/rules/add_permissions/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  getRoles() {
      return this._http.get('http://localhost:8040/api/rules', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  showRole(id: number) {
      return this._http.get('http://localhost:8040/api/rules/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result).catch(() => {
        return this._router.navigate(['not-found']);
      });
  }
  createRole(arr: object) {
      return this._http.post('http://localhost:8040/api/rules', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
    updateRole(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/rules/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), })
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    deleteRole(id: number) {
      return this._http.delete('http://localhost:8040/api/roles/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
    }

}
