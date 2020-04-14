import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  currentUser = new BehaviorSubject(null);
  permissions = new BehaviorSubject(null);
  errMessage = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

    getAuth(arr: object) {
        return this.http.post('http://localhost:8040/api/auth', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
            })
        }).map(result => result);
    }
    logoutAuth(id: number) {
       return this.http.get('http://localhost:8040/api/users/logout/' + id + '').map(result => result);
    }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

}
