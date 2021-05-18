import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../common/services/users.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent{
  

  data:any;
  user: any;
  constructor(private userService : UsersService,
    public dialog: MatDialog,
  public dialogRef: MatDialogRef<ProfileDialogComponent>) { }

  profile_form = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  get first_name(){
    return this.profile_form.get("first_name");
  }

  get last_name(){
    return this.profile_form.get("last_name");
  }

  get email(){
    return this.profile_form.get("email");
  }

  get password(){
    return this.profile_form.get("password");
  }

  updateProfile(){
    var user = this.profile_form.value;
      user.role = "admin";
      this.userService.resgisterUser(user)
      .subscribe(
        response => {
          
        }
      )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public editUser(id:any){
    this.dialog.open(ProfileDialogComponent,{
      data : this.user
    });
  }

}
