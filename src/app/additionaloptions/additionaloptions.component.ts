import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionaloptionsModalComponent } from 'app/additionaloptions-modal/additionaloptions-modal.component';
import { AdditionaloptionsService } from 'app/common/services/additionaloptions.service';

@Component({
  selector: 'app-additionaloptions',
  templateUrl: './additionaloptions.component.html',
  styleUrls: ['./additionaloptions.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class AdditionaloptionsComponent implements OnInit {

  aoptions:any;
  result: any;

  constructor(private aoptionsService : AdditionaloptionsService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.aoptionsService.getAdditionaloptionSubject.subscribe(()=>{
      this.fetchAdditionaloption();
    })
    
  }

  fetchAdditionaloption(){
    this.aoptionsService.getAdditionaloptions()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.aoptions = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteAdditionaloption(id:any){
    this.aoptionsService.deleteAdditionaloption(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchAdditionaloption();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createAdditionaloption(){
    this.dialog.open(AdditionaloptionsModalComponent,{
      width: '600px',
      data: {title:'Add Additional Option',button:'Add',id:0},
    });
  }

  editAdditionaloption(data:any){
    this.dialog.open(AdditionaloptionsModalComponent,{
      width: '600px',
      data : {form:data,title:'Add Additional Option',button:'Update',id:data.id}
    });
    
  }

}
