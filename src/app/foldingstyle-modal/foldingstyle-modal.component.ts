import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { FoldingstyleService } from 'app/common/services/foldingstyle.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-foldingstyle-modal',
  templateUrl: './foldingstyle-modal.component.html',
  styleUrls: ['./foldingstyle-modal.component.css']
})
export class FoldingstyleModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  foldingstyle: any;
  result: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private unfoldedService : FoldingstyleService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FoldingstyleModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
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
        this.foldingstyle_form.controls['name'].setValue(this.data.name);
        this.foldingstyle_form.controls['category_id'].setValue(this.data.category_id);
        this.foldingstyle_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
        this.foldingstyle_form.controls['price'].setValue(this.data.price);
        this.subcatService.getSubcategoryByCategory(this.data.category_id)
        .subscribe(
          response => {
            this.result = response;
            if(this.result.success){
              this.subcategories = this.result.data;
            }else{
              this.subcategories = [{id: 0, name: 'Select Subcategory'}];
            }
          }
        )
      }
    }

   
  foldingstyle_form = new FormGroup({
    name: new FormControl(''),
    subcategory_id: new FormControl(''),
    category_id: new FormControl(''),
    price: new FormControl('')
  });

  change_subcategories(id:any){
    this.subcatService.getSubcategoryByCategory(id)
    .subscribe(
      response => {
        this.subcategories = response;
        this.subcategories = this.subcategories.data;
        
      }
    )     
  }



  submitFoldingstyle(){
    this.foldingstyle = this.foldingstyle_form.value;
    if(this.id==0){
      this.unfoldedService.addFoldingstyle(this.foldingstyle)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          this.unfoldedService.getFoldingstyleSubject.next(true);
          this.dialogRef.close();
        }
      )
    }else if(this.id>0){
      this.unfoldedService.updateFoldingstyle(this.id,this.foldingstyle)
      .subscribe(
        response => {
          this.unfoldedService.getFoldingstyleSubject.next(true);
          this.dialogRef.close();
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
