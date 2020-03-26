import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

  constructor(private _http: HttpClient, private _router: Router) { }

  getUsers() {
      return this._http.get('http://localhost:8040/api/users', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  getSprints() {
      return this._http.get('http://localhost:8040/api/sprints', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  getInvoices() {
      return this._http.get('http://task-treking/public/api/invoices').map(result => result);
  }
  getTasks() {
      return this._http.get('http://localhost:8040/api/tasks?include=user', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result);
  }
  showTask(id: number) {
      return this._http.get('http://localhost:8040/api/tasks/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'), })
      }).map(result => result).catch(() => {
        return this._router.navigate(['not-found']);
      });
  }
  createTask(arr: object) {
      return this._http.post('http://localhost:8040/api/tasks', arr).map(result => result);
  }
    updateTask(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/tasks/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                })
        }).map(result => result).catch(() => {
          return this._router.navigate(['not-found']);
        });
    }
    deleteTask(id: number) {
      return this._http.delete('http://localhost:8040/api/tasks/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    createVote(arr: object) {
        return this._http.post('http://localhost:8040/api/votes', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    checkVote(id: number) {
        return this._http.get('http://localhost:8040/api/vote_count/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    checkVoter(id: string) {
        return this._http.get('http://localhost:8040/api/vote_counter/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    updateVote(id: number, arr: object) {
        return this._http.put('http://localhost:8040/api/votes/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:8040/api/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }

}
