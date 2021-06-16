import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoldingstyleService } from 'app/common/services/foldingstyle.service';
import { FoldingstyleModalComponent } from 'app/foldingstyle-modal/foldingstyle-modal.component';

@Component({
  selector: 'app-foldingstyle',
  templateUrl: './foldingstyle.component.html',
  styleUrls: ['./foldingstyle.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class FoldingstyleComponent implements OnInit {

  foldingstyle:any;
  result: any;

  constructor(private foldingstyleService : FoldingstyleService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.foldingstyleService.getFoldingstyleSubject.subscribe(()=>{
      this.fetchFoldingstyle();
    })
    
  }

  fetchFoldingstyle(){
    this.foldingstyleService.getfoldingstyles()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.foldingstyle = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteFoldingstyle(id:any){
    this.foldingstyleService.deleteFoldingstyle(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchFoldingstyle();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createFoldingstyle(){
    this.dialog.open(FoldingstyleModalComponent,{
      width: '600px',
      data: {title:'Add Folding Style',button:'Add',id:0},
    });
  }

  editFoldingstyle(data:any){
    this.dialog.open(FoldingstyleModalComponent,{
      width: '600px',
      data : {form:data,title:'Add Folding Style',button:'Update',id:data.id}
    });
    
  }

}
