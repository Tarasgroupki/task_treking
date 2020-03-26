import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient, private _router: Router) { }

  fileUpload(arr: object) {
      return this._http.post('http://localhost:8040/api/fileUpload', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      });
  }
  getRoles(id: number) {
      return this._http.get('http://localhost:8040/api/users/add_roles/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  AssignRoles(id: number, arr: object) {
      return this._http.post('http://localhost:8040/api/users/assign/' + id + '', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getUsers() {
      return this._http.get('http://localhost:8040/api/users', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showUser(id: number) {
        return this._http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    showUserProfile(id: number) {
        return this._http.get('http://localhost:8040/api/profile/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
  createUser(arr: object) {
      return this._http.post('http://localhost:8040/api/users', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateUser(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/users/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    updateProfileUser(id: number, arr: object) {
      return this._http.put('http://localhost:8040/api/profile/' + id + '', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
        return this._router.navigate(['not-found']);
      });
    }
    deleteUser(id: number) {
      return this._http.delete('http://localhost:8040/api/users/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }

}
