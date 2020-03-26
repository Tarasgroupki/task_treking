import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeadsService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getUsers() {
      return this._http.get('http://localhost:8040/api/users', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getLeads() {
      return this._http.get('http://localhost:8040/api/leads', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showLead(id: number) {
      return this._http.get('http://localhost:8040/api/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
        return this._router.navigate(['not-found']);
      });
  }
  createLead(parameters: { arr: object }) {
      const arr = parameters.arr;
      return this._http.post('http://localhost:8040/api/leads', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateLead(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/leads/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    deleteLead(id: number) {
      return this._http.delete('http://localhost:8040/api/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }

}
