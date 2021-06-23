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
  result: any;

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
        this.result = response;
        if(this.result.success){
          this.categories = this.result.data;
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
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
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
