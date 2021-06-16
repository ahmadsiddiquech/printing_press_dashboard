import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnfoldedsizeService } from 'app/common/services/unfoldedsize.service';
import { UnfoldedsizeModalComponent } from 'app/unfoldedsize-modal/unfoldedsize-modal.component';

@Component({
  selector: 'app-unfoldedsize',
  templateUrl: './unfoldedsize.component.html',
  styleUrls: ['./unfoldedsize.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class UnfoldedsizeComponent implements OnInit {

  unfoldedsize:any;
  result: any;

  constructor(private unfoldedService : UnfoldedsizeService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.unfoldedService.getUnfoldedsizeSubject.subscribe(()=>{
      this.fetchUnfoldedsize();
    })
    
  }

  fetchUnfoldedsize(){
    this.unfoldedService.getUnfoldedsizes()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.unfoldedsize = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteUnfoldedsize(id:any){
    this.unfoldedService.deleteUnfoldedsize(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchUnfoldedsize();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createUnfoldedsize(){
    this.dialog.open(UnfoldedsizeModalComponent,{
      width: '600px',
      data: {title:'Add Unfolded Size',button:'Add',id:0},
    });
  }

  editUnfoldedsize(data:any){
    this.dialog.open(UnfoldedsizeModalComponent,{
      width: '600px',
      data : {form:data,title:'Add Unfolded Size',button:'Update',id:data.id}
    });
    
  }

}
