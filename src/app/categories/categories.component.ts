import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'app/common/services/categories.service';
import { CategoryModalComponent } from 'app/category-modal/category-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class CategoriesComponent implements OnInit {
  categories:any;
  category: any;

  constructor(private catService : CategoriesService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.catService.getCategorySubject.subscribe(()=>{
      this.fetchCategories();
    })
  }

  fetchCategories(){
    this.catService.getCategories()
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

  fetchCategory(id:any){
    this.catService.getcategory(id)
    .subscribe(
      response => {
        this.category = response;
        if(this.category.success){
          this.category = this.category.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteCat(id:any){
    this.catService.deleteCategory(id)
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
    this.dialog.open(CategoryModalComponent,{
      width: '600px',
      data: {title:'Add Category',button:'Add',id:0},
    });
  }

  editCat(data:any){
    this.dialog.open(CategoryModalComponent,{
      width: '600px',
      data : {form:data,title:'Update Category',button:'Update',id:data.id}
    });
    
  }

}
