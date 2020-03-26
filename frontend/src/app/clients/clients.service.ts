import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientsService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getUsers() {
      return this._http.get('http://localhost:8040/api/users', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  getClients() {
      return this._http.get('http://localhost:8040/api/index', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  showClient(id: number) {
      return this._http.get('http://localhost:8040/api/index/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
      });
  }
  createClient(arr: object) {
      return this._http.post('http://localhost:8040/api/index', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateClient(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/index/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
            return this._router.navigate(['not-found']);
        });
    }
    deleteClient(id: number) {
      return this._http.delete('http://localhost:8040/api/index/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }

}
