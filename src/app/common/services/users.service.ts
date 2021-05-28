import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = `http://localhost:3000/api/users`;
  constructor(private http:HttpClient) { }
  public getUsersSubject:BehaviorSubject<any>=new BehaviorSubject<any>(false);

  getUsers():Observable<any>{
    return this.http.get(this.usersUrl);
  }

  getUser(id:any){
    return this.http.get(this.usersUrl+'/'+id);
  }

  addUser(user: any){
    return this.http.post(this.usersUrl,user);
  }

  deleteUser(id:any){
    return this.http.delete(this.usersUrl+'/'+id);
  }

  updateUsers(id:any,user:any){
    return this.http.put(this.usersUrl+'/'+id,user);
  }

  updateUsersImage(id:any,user:any){
    return this.http.put(this.usersUrl+'/upload_image/'+id,user);
  }
}
