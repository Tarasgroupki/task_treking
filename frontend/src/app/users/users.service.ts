import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  fileUpload(arr:object) {
      return this._http.post('http://task-treking/public/api/fileUpload', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      });
  }
  getRoles(id: number){
      return this._http.get('http://task-treking/public/api/users/add_roles/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  AssignRoles(id: number, arr: object){
      return this._http.post('http://task-treking/public/api/users/assign/'+id+'', arr,{
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getUsers(){
      return this._http.get('http://task-treking/public/api/users',{
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showUser(id: number){
        return this._http.get('http://task-treking/public/api/users/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    showUserProfile(id: number){
        return this._http.get('http://task-treking/public/api/profile/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
  createUser(arr: object) {
      return this._http.post('http://task-treking/public/api/users', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateUser(id: number, arr: object) {
        return this._http.put('http://task-treking/public/api/users/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
            return  window.location.href = 'http://localhost:4200/not-found';
        });
    }
    updateProfileUser(id: number, arr: object) {
      return this._http.put('http://task-treking/public/api/profile/'+id+'', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    deleteUser(id: number) {
      return this._http.delete('http://task-treking/public/api/users/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
  /*getClients(): Observable<ClientsInterface[]> {
    return this.http.get(this._clientsURL).map((response: Responce) => {
      return <ClientsInterface[]>response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
    public getAllClients(): Observable<ClientsInterface[]> {
        return this.http
            .get(this.API_URL)
            .map(response => {
                const todos = response.json();
                return todos.map((todo) => new ClientsInterface(todo));
            })
            .catch(this.handleError);
    }*/

}
