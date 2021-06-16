import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';
import { UnfoldedsizeService } from 'app/common/services/unfoldedsize.service';

@Component({
  selector: 'app-unfoldedsize-modal',
  templateUrl: './unfoldedsize-modal.component.html',
  styleUrls: ['./unfoldedsize-modal.component.css']
})
export class UnfoldedsizeModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  unfoldedsize: any;
  result: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private unfoldedService : UnfoldedsizeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UnfoldedsizeModalComponent>,
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
        this.unfolded_form.controls['name'].setValue(this.data.name);
        this.unfolded_form.controls['category_id'].setValue(this.data.category_id);
        this.unfolded_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
        this.unfolded_form.controls['price'].setValue(this.data.price);
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

   
  unfolded_form = new FormGroup({
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



  submitUnfoldedsize(){
    this.unfoldedsize = this.unfolded_form.value;
    if(this.id==0){
      this.unfoldedService.addUnfoldedsize(this.unfoldedsize)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          this.unfoldedService.getUnfoldedsizeSubject.next(true);
          this.dialogRef.close();
        }
      )
    }else if(this.id>0){
      this.unfoldedService.updateUnfoldedsize(this.id,this.unfoldedsize)
      .subscribe(
        response => {
          this.unfoldedService.getUnfoldedsizeSubject.next(true);
          this.dialogRef.close();
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
