import { Component, OnInit } from '@angular/core';
import { UsersService } from '../common/services/users.service';
import {MatSnackBar} from '@angular/material/snack-bar'
import {MatDialog} from '@angular/material/dialog';
import { AdminUsersModalComponent } from 'app/admin-users-modal/admin-users-modal.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [MatSnackBar,MatDialog]
})

export class AdminUsersComponent implements OnInit {
  user_data: any;
  result: any;
  user: any;

  

  constructor(private userService : UsersService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

    ngOnInit(){
      this.userService.getUsersSubject.subscribe(()=>{
        this.fetchUsers();
      })
    }

    deleteUser(id:any){
      this.userService.deleteUser(id)
      .subscribe(
        response => {
          this.result = response;
          if(this.result.success){
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
            this.fetchUsers();
          }
        },
        error => {
          console.log(error)
        }
      )
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

    createUser(){
      this.dialog.open(AdminUsersModalComponent,{
        width: '600px',
        data: {title:'Add User',button:'Add',id:0},
      });
    }
  
    editUser(data:any){
      this.dialog.open(AdminUsersModalComponent,{
        width: '600px',
        data : {form:data,title:'Update User',button:'Update',id:data.id}
      });
      
    }

}
