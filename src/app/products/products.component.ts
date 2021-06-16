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
  result: any;
  data: any;

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
        this.result = response;
        if(this.result.success){
          this.categories = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.subcatService.getSubcategories()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.subcategories = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.foptionsService.getFinishingoptions()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.foptions = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
    this.productService.getProducts()
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.products = this.result.data;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteProduct(id:any){
    this.productService.deleteProduct(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.snackBar.open(this.result.message, 'Okay', {
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

  createProducts(){
    this.dialog.open(ProductsModalComponent,{
      width: '600px',
      data: {title:'Add Products',button:'Add',id:0},
    });
  }

  editProduct(id:any){
    this.productService.getProduct(id)
    .subscribe(
      response => {
        this.result = response;
        if(this.result.success){
          this.data = this.result;
          this.dialog.open(ProductsModalComponent,{
            width: '600px',
            data : {form:this.data,title:'Update Product',button:'Update',id:id}
          });
        }
      },
      error => {
        console.log(error)
      }
    )
    
  }
}
