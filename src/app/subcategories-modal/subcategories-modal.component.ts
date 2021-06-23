import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-subcategories-modal',
  templateUrl: './subcategories-modal.component.html',
  styleUrls: ['./subcategories-modal.component.css']
})
export class SubcategoriesModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  subcategory:any;
  myFile: any;
  selectedFile: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubcategoriesModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      dialogRef.disableClose = true;
      this.data = data.form
      this.title = data.title
      this.button = data.button
      this.id = data.id
    }

    ngOnInit(){
      this.catService.getCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories = this.categories.data;
        }
      )
      if(this.data != null){
        this.cat_form.controls['name'].setValue(this.data.name);
        this.cat_form.controls['category_id'].setValue(this.data.category_id);
        this.cat_form.controls['description'].setValue(this.data.description);
      }
    }

   
  cat_form = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category_id: new FormControl(''),
    image: new FormControl('')
  });



  submitSubcategory(){
    this.dialogRef.close();
    this.subcategory = this.cat_form.value;
    delete this.subcategory.image;
    if(this.id==0){
      this.subcatService.addSubcategory(this.subcategory)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          if(this.selectedFile != null){
            console.log(this.id)
            const formdata = new FormData();
            formdata.append('image', this.selectedFile, this.selectedFile.name);
            this.subcatService.updateSubcategoriesImage(this.id,formdata)
            .subscribe(
              response => {
                this.subcatService.getSubcategorySubject.next(true);
              }
            )
          }
        }
      )
    }else if(this.id>0){
      if(this.selectedFile != null){
        const formdata = new FormData();
        formdata.append('image', this.selectedFile, this.selectedFile.name);
        this.subcatService.updateSubcategoriesImage(this.id,formdata)
        .subscribe(
          response => {
            
          }
        )
      }
      this.subcatService.updateSubcategories(this.id,this.subcategory)
      .subscribe(
        response => {
          this.subcatService.getSubcategorySubject.next(true);
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
