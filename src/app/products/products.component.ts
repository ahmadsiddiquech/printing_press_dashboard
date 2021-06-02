import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from 'app/common/services/categories.service';
import { FinishingoptionsService } from 'app/common/services/finishingoptions.service';
import { ProductsService } from 'app/common/services/products.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';
import { ProductsModalComponent } from 'app/products-modal/products-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MatSnackBar,MatDialog]
})
export class ProductsComponent implements OnInit {

  subcategories:any;
  category: any;
  categories: any;
  foptions: any;
  products: any;

  constructor(private subcatService : SubcategoriesService,private productService : ProductsService,private catService : CategoriesService,private foptionsService : FinishingoptionsService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(){
    this.productService.getProductSubject.subscribe(()=>{
      this.fetchProducts();
    })
    
  }

  fetchProducts(){
    this.catService.getCategories()
    .subscribe(
      response => {
        this.categories = response;
        if(this.categories.success){
          this.categories = this.categories.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.subcatService.getSubcategories()
    .subscribe(
      response => {
        this.subcategories = response;
        if(this.subcategories.success){
          this.subcategories = this.subcategories.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.foptionsService.getFinishingoptions()
    .subscribe(
      response => {
        this.foptions = response;
        if(this.foptions.success){
          this.foptions = this.foptions.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.productService.getProducts()
    .subscribe(
      response => {
        this.products = response;
        if(this.products.success){
          this.products = this.products.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteSubcat(id:any){
    this.subcatService.deleteSubcategory(id)
    .subscribe(
      response => {
        this.subcategories = response;
        if(this.subcategories.success){
          this.snackBar.open(this.subcategories.message, 'Okay', {
            duration: 5 * 1000,
          });
          this.fetchProducts();
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  createSubcat(){
    this.dialog.open(ProductsModalComponent,{
      width: '600px',
      data: {title:'Add Products',button:'Add',id:0},
    });
  }

  editSubcat(data:any){
    this.dialog.open(ProductsModalComponent,{
      width: '600px',
      data : {form:data,title:'Update Product',button:'Update',id:data.id}
    });
    
  }

}
