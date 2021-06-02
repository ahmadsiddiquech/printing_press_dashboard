import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { FinishingoptionsService } from 'app/common/services/finishingoptions.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-finishingoptions-modal',
  templateUrl: './finishingoptions-modal.component.html',
  styleUrls: ['./finishingoptions-modal.component.css']
})
export class FinishingoptionsModalComponent implements OnInit {

  data = null;
  id:any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  finishoptions: any;

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private foptionService : FinishingoptionsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FinishingoptionsModalComponent>,
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
      this.subcatService.getSubcategories()
      .subscribe(
        response => {
          this.subcategories = response;
          this.subcategories = this.subcategories.data;
        }
      )
      if(this.data != null){
        this.cat_form.controls['name'].setValue(this.data.name);
        this.cat_form.controls['category_id'].setValue(this.data.category_id);
        this.cat_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
      }
    }

   
  cat_form = new FormGroup({
    name: new FormControl(''),
    subcategory_id: new FormControl(''),
    category_id: new FormControl('')
  });



  submitFinishoptions(){
    this.dialogRef.close();
    this.finishoptions = this.cat_form.value;
    if(this.id==0){
      this.foptionService.addFinishingoption(this.finishoptions)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          this.foptionService.getFinishingoptionSubject.next(true);
        }
      )
    }else if(this.id>0){
      this.foptionService.updateFinishingoptions(this.id,this.finishoptions)
      .subscribe(
        response => {
          this.foptionService.getFinishingoptionSubject.next(true);
        }
      )
    }
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
