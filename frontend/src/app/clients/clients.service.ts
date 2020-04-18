import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientsService {

  constructor(private http: HttpClient, private router: Router) { }

  getUsers() {
      return this.http.get('http://localhost:8040/api/usersForm', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getClients() {
      return this.http.get('http://localhost:8040/api/index', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showClient(id: number) {
      return this.http.get('http://localhost:8040/api/index/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
          return this.router.navigate(['not-found']);
      });
  }
  createClient(arr: object) {
      return this.http.post('http://localhost:8040/api/index', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateClient(id: number, arr: object) {
        return this.http.put('http://localhost:8040/api/index/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
            return this.router.navigate(['not-found']);
        });
    }
    deleteClient(id: number) {
      return this.http.delete('http://localhost:8040/api/index/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }

}
