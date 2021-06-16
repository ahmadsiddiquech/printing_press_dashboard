import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { PapertypeService } from 'app/common/services/papertype.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-papertype-modal',
  templateUrl: './papertype-modal.component.html',
  styleUrls: ['./papertype-modal.component.css']
})
export class PapertypeModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  papertype: any;
  result: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private papertypeService : PapertypeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PapertypeModalComponent>,
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
        this.papertype_form.controls['name'].setValue(this.data.name);
        this.papertype_form.controls['category_id'].setValue(this.data.category_id);
        this.papertype_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
        this.papertype_form.controls['price'].setValue(this.data.price);
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

   
    papertype_form = new FormGroup({
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



  submitPapertype(){
    this.papertype = this.papertype_form.value;
    if(this.id==0){
      this.papertypeService.addPapertype(this.papertype)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          this.papertypeService.getPapertypeSubject.next(true);
          this.dialogRef.close();
        }
      )
    }else if(this.id>0){
      this.papertypeService.updatePapertype(this.id,this.papertype)
      .subscribe(
        response => {
          this.papertypeService.getPapertypeSubject.next(true);
          this.dialogRef.close();
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
