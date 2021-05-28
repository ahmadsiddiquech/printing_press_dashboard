import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'app/common/services/users.service';

@Component({
  selector: 'app-admin-users-modal',
  templateUrl: './admin-users-modal.component.html',
  styleUrls: ['./admin-users-modal.component.css']
})
export class AdminUsersModalComponent{

  data = null;
  id:any;
  title : any;
  button : any;
  user: any;
  myFile: any;
  selectedFile: any;

  constructor(private userService : UsersService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminUsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data.form
      this.title = data.title
      this.button = data.button
      this.id = data.id
    }

    ngOnInit(){   
      if(this.data != null){
        this.profile_form.controls['first_name'].setValue(this.data.first_name);
        this.profile_form.controls['last_name'].setValue(this.data.last_name);
        this.profile_form.controls['email'].setValue(this.data.email);
      }
    }

    profile_form = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      image: new FormControl('')
    });


  submitUser(){
    this.dialogRef.close();
    this.user = this.profile_form.value;
    delete this.user.image;
    if(this.id==0){
      this.user.role = "admin"
      this.userService.addUser(this.user)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          if(this.selectedFile != null){
            console.log(this.id)
            const formdata = new FormData();
            formdata.append('image', this.selectedFile, this.selectedFile.name);
            this.userService.updateUsersImage(this.id,formdata)
            .subscribe(
              response => {
                this.userService.getUsersSubject.next(true);
              }
            )
          }
        }
      )
    }else if(this.id>0){
      delete this.user.password;
      if(this.selectedFile != null){
        const formdata = new FormData();
        formdata.append('image', this.selectedFile, this.selectedFile.name);
        this.userService.updateUsersImage(this.id,formdata)
        .subscribe(
          response => {
            
          }
        )
      }
      this.userService.updateUsers(this.id,this.user)
      .subscribe(
        response => {
          this.userService.getUsersSubject.next(true);
        }
      )
    }
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onImageChange(event :any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
      if (this.myFile.size <= 5242880) {
        this.selectedFile = event.target.files[0];
      }
    }
  }

}
