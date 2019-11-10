import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getUsers(){
      return this._http.get('http://task-treking/public/api/users',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getSprints(){
      return this._http.get('http://task-treking/public/api/sprints',{
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getInvoices(){
      return this._http.get('http://task-treking/public/api/invoices').map(result => result);
  }
  getTasks(){
      return this._http.get('http://task-treking/public/api/tasks?include=user', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  showTask(id: number){
      return this._http.get('http://task-treking/public/api/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });

      /*.pipe(
          map() => {},

      )*/

  }
  createTask(arr: object){
      return this._http.post('http://task-treking/public/api/tasks', arr).map(result => result);
  }
    updateTask(id: number,arr: object){
        return this._http.put('http://task-treking/public/api/tasks/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                })
        }).map(result => result).catch((err) => {
            return  window.location.href = 'http://localhost:4200/not-found';
        });
    }
    deleteTask(id:number){
      return this._http.delete('http://task-treking/public/api/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    createVote(arr: object){
        return this._http.post('http://task-treking/public/api/votes', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    checkVote(id: number){
        return this._http.get('http://task-treking/public/api/vote_count/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    checkVoter(id: string){
        return this._http.get('http://task-treking/public/api/vote_counter/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    updateVote(id: number,arr: object){
        return this._http.put('http://task-treking/public/api/votes/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://task-treking/public/api/users/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    /* getSprintById(id: number) {
         return this._http.get('http://task-treking/public/api/sprints/'+id+'', {
             headers: new HttpHeaders({'Accept': 'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('token'),})
         }).map(result => result);
     }
     getClientById(id: number) {
         return this._http.get('http://task-treking/public/api/index/'+id+'', {
             headers: new HttpHeaders({'Accept': 'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('token'),})
         }).map(result => result)     }
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
