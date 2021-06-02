import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinishingoptionsService } from 'app/common/services/finishingoptions.service';
import { FinishingoptionsModalComponent } from 'app/finishingoptions-modal/finishingoptions-modal.component';

@Component({
  selector: 'app-finishingoptions',
  templateUrl: './finishingoptions.component.html',
  styleUrls: ['./finishingoptions.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class FinishingoptionsComponent implements OnInit {

  foptions:any;
  category: any;

  constructor(private foptionsService : FinishingoptionsService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.foptionsService.getFinishingoptionSubject.subscribe(()=>{
      this.fetchFinishingoption();
    })
    
  }

  fetchFinishingoption(){
    this.foptionsService.getFinishingoptions()
    .subscribe(
      response => {
        this.foptions = response;
        if(this.foptions.success){
          this.foptions = this.foptions.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteFinishingoption(id:any){
    this.foptionsService.deleteFinishingoption(id)
    .subscribe(
      response => {
        this.foptions = response;
        if(this.foptions.success){
          this.snackBar.open(this.foptions.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchFinishingoption();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createFinishingoption(){
    this.dialog.open(FinishingoptionsModalComponent,{
      width: '600px',
      data: {title:'Add Finishing Option',button:'Add',id:0},
    });
  }

  editFinishingoption(data:any){
    this.dialog.open(FinishingoptionsModalComponent,{
      width: '600px',
      data : {form:data,title:'Add Finishing Option',button:'Update',id:data.id}
    });
    
  }

}
