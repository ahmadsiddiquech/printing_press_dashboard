import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcategoriesService } from 'app/common/services/subcategories.service';
import { SubcategoriesModalComponent } from 'app/subcategories-modal/subcategories-modal.component';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  categories:any;
  category: any;

  constructor(private catService : SubcategoriesService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.catService.getSubcategorySubject.subscribe(()=>{
      this.fetchCategories();
    })
  }

  fetchCategories(){
    this.catService.getSubcategories()
    .subscribe(
      response => {
        this.categories = response;
        if(this.categories.success){
          this.categories = this.categories.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteCat(id:any){
    this.catService.deleteSubcategory(id)
    .subscribe(
      response => {
        this.categories = response;
        if(this.categories.success){
          this.snackBar.open(this.categories.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchCategories();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createCat(){
    this.dialog.open(SubcategoriesModalComponent,{
      width: '600px',
      data: {title:'Add Subcategory',button:'Add',id:0},
    });
  }

  editCat(data:any){
    this.dialog.open(SubcategoriesModalComponent,{
      width: '600px',
      data : {form:data,title:'Update Subcategory',button:'Update',id:data.id}
    });
    
  }

}
