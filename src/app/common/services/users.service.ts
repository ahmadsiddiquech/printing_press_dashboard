import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = `http://localhost:3000/api/users`;
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.usersUrl);
  }

  getUser(id:any){
    return this.http.get(this.usersUrl+'/'+id);
  }

  updateUsers(id:any,user:any){
    return this.http.put(this.usersUrl+'/'+id,user);
  }

  updateUsersImage(id:any,user:any){
    return this.http.put(this.usersUrl+'/upload_image/'+id,user);
  }
}
