import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditionaloptionsService } from 'app/common/services/additionaloptions.service';
import { CategoriesService } from 'app/common/services/categories.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-additionaloptions-modal',
  templateUrl: './additionaloptions-modal.component.html',
  styleUrls: ['./additionaloptions-modal.component.css']
})
export class AdditionaloptionsModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  additionaloptions: any;
  result: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private aoptionService : AdditionaloptionsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdditionaloptionsModalComponent>,
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
        this.aoptions_form.controls['name'].setValue(this.data.name);
        this.aoptions_form.controls['category_id'].setValue(this.data.category_id);
        this.aoptions_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
        this.aoptions_form.controls['price'].setValue(this.data.price);
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

   
  aoptions_form = new FormGroup({
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



  submitAdditionaloptions(){
    this.additionaloptions = this.aoptions_form.value;
    if(this.id==0){
      this.aoptionService.addAdditionaloption(this.additionaloptions)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          this.aoptionService.getAdditionaloptionSubject.next(true);
          this.dialogRef.close();
        }
      )
    }else if(this.id>0){
      this.aoptionService.updateAdditionaloptions(this.id,this.additionaloptions)
      .subscribe(
        response => {
          this.aoptionService.getAdditionaloptionSubject.next(true);
          this.dialogRef.close();
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
