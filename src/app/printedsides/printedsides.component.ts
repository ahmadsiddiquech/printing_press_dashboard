import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrintedsidesService } from 'app/common/services/printedsides.service';
import { PrintedsidesModalComponent } from 'app/printedsides-modal/printedsides-modal.component';

@Component({
  selector: 'app-printedsides',
  templateUrl: './printedsides.component.html',
  styleUrls: ['./printedsides.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class PrintedsidesComponent implements OnInit {

  printedsides:any;
  result: any;

  constructor(private printedsidesService : PrintedsidesService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.printedsidesService.getPrintedsidesSubject.subscribe(()=>{
      this.fetchPrintedsides();
    })
  }

  fetchPrintedsides(){
    this.printedsidesService.getPrintedsides()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.printedsides = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deletePrintedsides(id:any){
    this.printedsidesService.deletePrintedsides(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchPrintedsides();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createPrintedsides(){
    this.dialog.open(PrintedsidesModalComponent,{
      width: '600px',
      data: {title:'Add Printed Sides',button:'Add',id:0},
    });
  }

  editPrintedsides(data:any){
    this.dialog.open(PrintedsidesModalComponent,{
      width: '600px',
      data : {form:data,title:'Add Printed Sides',button:'Update',id:data.id}
    });
    
  }

}