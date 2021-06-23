import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { FinishingoptionsService } from 'app/common/services/finishingoptions.service';
import { ProductsService } from 'app/common/services/products.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';
import { FinishingoptionsModalComponent } from 'app/finishingoptions-modal/finishingoptions-modal.component';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit {

  data = null;
  id : any;
  title : any;
  button : any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  finishoptions: any;
  product:any;
  myFile: any;
  result: any;
  f_options: any;
  f_op = [];

  constructor(private subcatService : SubcategoriesService,
    private catService : CategoriesService,
    private foptionService : FinishingoptionsService,
    private productService : ProductsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FinishingoptionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
        dialogRef.disableClose = true;
        this.data = data.form?.data
        this.f_options = data.form?.f_options
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

        this.product_form.controls['name'].setValue(this.data.name);
        // this.product_form.controls['price'].setValue(this.data.price);
        this.product_form.controls['category_id'].setValue(this.data.category_id);
        this.product_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
        this.product_form.controls['description'].setValue(this.data.description);
        
        // for(let i = 0;i < this.f_options.length;i++){
        //   this.f_op.push(this.f_options[i].id);
        // }
        // this.product_form.controls['finishingoptions_id'].setValue(this.f_op);
        
        this.subcatService.getSubcategoryByCategory(this.data.category_id)
        .subscribe(
          response => {
            this.subcategories = response;
            this.subcategories = this.subcategories.data;
          }
        )
        this.foptionService.getFinishingoptionBySubcategory(this.data.subcategory_id)
        .subscribe(
          response => {
            this.finishoptions = response;
            this.finishoptions = this.finishoptions.data;
          }
        )
      }
    }

   
  product_form = new FormGroup({
    name: new FormControl(''),
    // price: new FormControl(''),
    subcategory_id: new FormControl(''),
    category_id: new FormControl(''),
    // finishingoptions_id: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  });

  change_subcategories(id:any){
    this.subcatService.getSubcategoryByCategory(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.subcategories = this.result.data;
        }else{
          this.subcategories = [{id: 0, name: 'No Record Found'}];
        }
      }
    )     
  }

  change_finishoptions(id:any){
    this.foptionService.getFinishingoptionBySubcategory(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.finishoptions = this.result.data;
        }else{
          this.finishoptions = [{id: 0, name: 'No Record Found'}];
        }
      }
    )     
  }



  submitProduct(){
    this.dialogRef.close();
    this.product = this.product_form.value;
    if(this.id==0){
      this.productService.addProduct(this.product)
      .subscribe(
        response => {
          this.data = response;
          this.id = this.data.data.id;
          if(this.selectedFile != null){
            const formdata = new FormData();
            formdata.append('image', this.selectedFile, this.selectedFile.name);
            this.productService.updateProductsImage(this.id,formdata)
            .subscribe(
              response => {
                // this.productService.getProductSubject.next(true);
              }
            )
          }
          this.productService.getProductSubject.next(true);
        }
      )
    }else if(this.id>0){
      if(this.selectedFile != null){
        const formdata = new FormData();
        formdata.append('image', this.selectedFile, this.selectedFile.name);
        this.productService.updateProductsImage(this.id,formdata)
        .subscribe(
          response => {
            this.productService.getProductSubject.next(true);
          }
        )
      }
      this.productService.updateProducts(this.id,this.product)
      .subscribe(
        response => {
          this.productService.getProductSubject.next(true);
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
