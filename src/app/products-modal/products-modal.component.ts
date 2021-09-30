import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'app/common/services/categories.service';
import { ProductsService } from 'app/common/services/products.service';
import { SubcategoriesService } from 'app/common/services/subcategories.service';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit {

  data = null;
  id: any;
  title: any;
  button: any;
  categories: any;
  selectedFile: any;
  subcategories: any;
  finishoptions: any;
  product: any;
  myFile: any;
  result: any;

  constructor(private subcatService: SubcategoriesService,
    private catService: CategoriesService,
    private productService: ProductsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    dialogRef.disableClose = true;
    this.data = data.form?.data
    this.title = data.title
    this.button = data.button
    this.id = data.id
  }

  ngOnInit() {
    this.catService.getCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories = this.categories.data;
        }
      )
    if (this.data != null) {

      this.product_form.controls['name'].setValue(this.data.name);
      // this.product_form.controls['price'].setValue(this.data.price);
      this.product_form.controls['category_id'].setValue(this.data.category_id);
      this.product_form.controls['subcategory_id'].setValue(this.data.subcategory_id);
      this.product_form.controls['description'].setValue(this.data.description);
      this.product_form.controls['featured'].setValue(this.data.featured);

      this.subcatService.getSubcategoryByCategory(this.data.category_id)
        .subscribe(
          response => {
            this.subcategories = response;
            this.subcategories = this.subcategories.data;
          }
        )
    }
  }


  product_form = new FormGroup({
    name: new FormControl(''),
    subcategory_id: new FormControl(''),
    category_id: new FormControl(''),
    description: new FormControl(''),
    featured: new FormControl(''),
    image: new FormControl(''),
  });

  change_subcategories(id: any) {
    this.subcatService.getSubcategoryByCategory(id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.subcategories = this.result.data;
          } else {
            this.subcategories = [{ id: 0, name: 'No Record Found' }];
          }
        }
      )
  }

  submitProduct() {
    this.dialogRef.close();
    this.product = this.product_form.value;
    if (this.id == 0) {
      this.productService.addProduct(this.product)
        .subscribe(
          response => {
            this.data = response;
            this.id = this.data.data.id;
            if (this.selectedFile != null) {
              const formdata = new FormData();
              formdata.append('image', this.selectedFile, this.selectedFile.name);
              this.productService.updateProductsImage(this.id, formdata)
                .subscribe(
                  response => {
                    // this.productService.getProductSubject.next(true);
                  }
                )
            }
            this.productService.getProductSubject.next(true);
          }
        )
    } else if (this.id > 0) {
      if (this.selectedFile != null) {
        const formdata = new FormData();
        formdata.append('image', this.selectedFile, this.selectedFile.name);
        this.productService.updateProductsImage(this.id, formdata)
          .subscribe(
            response => {
              this.productService.getProductSubject.next(true);
            }
          )
      }
      delete this.product.image;
      this.productService.updateProducts(this.id, this.product)
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

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
      if (this.myFile.size <= 5242880) {
        this.selectedFile = event.target.files[0];
      }
    }
  }

}
