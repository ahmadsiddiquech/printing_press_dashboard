import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/common/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user_data: any;

  constructor(private userService : UsersService) { }
  ngOnInit(){
    this.userService.getUsersSubject.subscribe(()=>{
      this.fetchUsers();
    })
  }

  fetchUsers(){
    this.userService.getUsers()
    .subscribe(
      response => {
        this.user_data = response;
        if(this.user_data.success){
          this.user_data = this.user_data.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}