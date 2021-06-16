import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PapertypeService } from 'app/common/services/papertype.service';
import { PapertypeModalComponent } from 'app/papertype-modal/papertype-modal.component';

@Component({
  selector: 'app-papertype',
  templateUrl: './papertype.component.html',
  styleUrls: ['./papertype.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class PapertypeComponent implements OnInit {

  papertype:any;
  result: any;

  constructor(private papertypeService : PapertypeService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.papertypeService.getPapertypeSubject.subscribe(()=>{
      this.fetchPapertype();
    })
  }

  fetchPapertype(){
    this.papertypeService.getPapertypes()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.papertype = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deletePapertype(id:any){
    this.papertypeService.deletePapertype(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchPapertype();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createPapertype(){
    this.dialog.open(PapertypeModalComponent,{
      width: '600px',
      data: {title:'Add Paper Type',button:'Add',id:0},
    });
  }

  editPapertype(data:any){
    this.dialog.open(PapertypeModalComponent,{
      width: '600px',
      data : {form:data,title:'Edit Paper Type',button:'Update',id:data.id}
    });
    
  }

}
