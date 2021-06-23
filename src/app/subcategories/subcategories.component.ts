import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcategoriesService } from 'app/common/services/subcategories.service';
import { SubcategoriesModalComponent } from 'app/subcategories-modal/subcategories-modal.component';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class SubcategoriesComponent implements OnInit {
  subcategories:any;
  category: any;
  result: any;

  constructor(private subcatService : SubcategoriesService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.subcatService.getSubcategorySubject.subscribe(()=>{
      this.fetchSubcategories();
    })
    
  }

  fetchSubcategories(){
    this.subcatService.getSubcategories()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.subcategories = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteSubcat(id:any){
    this.subcatService.deleteSubcategory(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchSubcategories();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createSubcat(){
    this.dialog.open(SubcategoriesModalComponent,{
      width: '600px',
      data: {title:'Add Subcategory',button:'Add',id:0},
    });
  }

  editSubcat(data:any){
    this.dialog.open(SubcategoriesModalComponent,{
      width: '600px',
      data : {form:data,title:'Update Subcategory',button:'Update',id:data.id}
    });
    
  }

}
