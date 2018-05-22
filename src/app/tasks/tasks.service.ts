import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getUsers(){
      return this._http.get('http://task_treking.ua/public/api/users').map(result => result);
  }
  getInvoices(){
      return this._http.get('http://task_treking.ua/public/api/invoices').map(result => result);
  }
  getTasks(){
      return this._http.get('http://task_treking.ua/public/api/tasks').map(result => result);
  }
  showTask(id: number){
      return this._http.get('http://task_treking.ua/public/api/tasks/'+id+'').map(result => result);
  }
  createTask(arr: object){
      return this._http.post('http://task_treking.ua/public/api/tasks', arr, {
          headers: new HttpHeaders().set('Accept', 'application/json')
      }).map(result => result);
  }
    updateTask(id: number,arr: object){
        return this._http.put('http://task_treking.ua/public/api/tasks/'+id+'', arr, {
            headers: new HttpHeaders().set('Accept', 'application/json')
        }).map(result => result);
    }
    deleteTask(id:number){
      return this._http.delete('http://task_treking.ua/public/api/tasks/'+id+'').map(result => result);
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
