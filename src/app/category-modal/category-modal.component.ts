import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../common/services/categories.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent {

  data:any;
  categories: any;

  constructor(private catService : CategoriesService,
    public dialog: MatDialog,
  public dialogRef: MatDialogRef<CategoryModalComponent>) { }

  cat_form = new FormGroup({
    category: new FormControl(''),
    description: new FormControl('')
  });

  get category(){
    return this.cat_form.get("category");
  }

  get description(){
    return this.cat_form.get("description");
  }

  updateCategory(){
    var user = this.cat_form.value;
      this.catService.addCategory(user)
      .subscribe(
        response => {
          
        }
      )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  public editUser(id:any){
    this.dialog.open(CategoryModalComponent,{
      data : this.categories
    });
  }

}
