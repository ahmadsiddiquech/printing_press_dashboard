import { Component, OnInit } from '@angular/core';
import { UsersService } from '../common/services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  user_data: any;

  constructor(private userService : UsersService) { }

  ngOnInit(){
      this.userService.getUsers()
      .subscribe(
        response => {
          this.user_data = response;
          if(this.user_data.success){
            this.user_data = this.user_data.data;
            this.user_data.image = (this.user_data.image == null) ? '../../assets/images/user_image.png' : 'uploads/images/'+this.user_data.image;
          }
        },
        error => {
          console.log(error)
        }
      )
    }

}