import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SprintsService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
      return this.http.get('http://localhost:8040/api/usersForm', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getLeads() {
       return this.http.get('http://localhost:8040/api/leadsForm', {
          headers: new HttpHeaders({'Accept': 'application/json'})
       }).map(result => result);
    }
  getInvoices() {
      return this.http.get('http://localhost:8040/api/invoices').map(result => result);
  }
  getSprints() {
      return this.http.get('http://localhost:8040/api/sprints', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showSprint(id: number) {
      return this.http.get('http://localhost:8040/api/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
        return this.router.navigate(['not-found']);
      });
  }
  createSprint(arr: object) {
      return this.http.post('http://localhost:8040/api/sprints', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateSprint(id: number, arr: object) {
        return this.http.put('http://localhost:8040/api/sprints/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
          return this.router.navigate(['not-found']);
        });
    }
    deleteSprint(id: number) {
      return this.http.delete('http://localhost:8040/api/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    dailyForecast(id: number) {
        return this.http.get('http://localhost:8040/api/pointses/' + id + '')
            .map(result => result);
    }
    getUserById(id: number) {
        return this.http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }

}
