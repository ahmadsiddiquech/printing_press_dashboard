import { Component, Inject, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../common/services/categories.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  category: any;
  myFile: any;
  selectedFile: any;

  constructor(private catService : CategoriesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data.form
      this.title = data.title
      this.button = data.button
      this.id = data.id
    }

    ngOnInit(){   
      if(this.data != null){
        this.cat_form.controls['category'].setValue(this.data.category);
        this.cat_form.controls['description'].setValue(this.data.description);
      }
    }

   
  cat_form = new FormGroup({
    category: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });


  submitCategory(){
    this.dialogRef.close();
    this.category = this.cat_form.value;
    delete this.category.image;
    if(this.id==0){
      this.catService.addCategory(this.category)
      .subscribe(
        response => {
          
        }
      )
    }else if(this.id>0){
      if(this.selectedFile != null){
        const formdata = new FormData();
        formdata.append('image', this.selectedFile, this.selectedFile.name);
        this.catService.updateCategoriesImage(this.id,formdata)
        .subscribe(
          response => {
            
          }
        )
      }
      this.catService.updateCategories(this.id,this.category)
      .subscribe(
        response => {
          this.ngOnInit();
        }
      )
    }
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onImageChange(event :any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
      if (this.myFile.size <= 5242880) {
        this.selectedFile = event.target.files[0];
      }
    }
  }

}
