import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SprintsService {

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
  getInvoices() {
      return this._http.get('http://localhost:8040/api/invoices').map(result => result);
  }
  getSprints() {
      return this._http.get('http://localhost:8040/api/sprints', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showSprint(id: number) {
      return this._http.get('http://localhost:8040/api/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
        return this._router.navigate(['not-found']);
      });
  }
  createSprint(arr: object) {
      return this._http.post('http://localhost:8040/api/sprints', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateSprint(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/sprints/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    deleteSprint(id: number) {
      return this._http.delete('http://localhost:8040/api/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    dailyForecast(id: number) {
        return this._http.get('http://localhost:8040/api/pointses/' + id + '')
            .map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }

}
