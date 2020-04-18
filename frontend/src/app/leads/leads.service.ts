import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeadsService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
      return this.http.get('http://localhost:8040/api/usersForm', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getLeads() {
      return this.http.get('http://localhost:8040/api/leads', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showLead(id: number) {
      return this.http.get('http://localhost:8040/api/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
        return this.router.navigate(['not-found']);
      });
  }
  createLead(parameters: { arr: object }) {
      const arr = parameters.arr;
      return this.http.post('http://localhost:8040/api/leads', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateLead(id: number, arr: object) {
        return this.http.put('http://localhost:8040/api/leads/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this.router.navigate(['not-found']);
        });
    }
    deleteLead(id: number) {
      return this.http.delete('http://localhost:8040/api/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    getUserById(id: number) {
        return this.http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }

}
