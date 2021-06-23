import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoptionsService } from 'app/common/services/productoptions.service';
import { ProductoptionsModalComponent } from 'app/productoptions-modal/productoptions-modal.component';
import { ProductoptionsuploadModalComponent } from 'app/productoptionsupload-modal/productoptionsupload-modal.component';

@Component({
  selector: 'app-productoptions',
  templateUrl: './productoptions.component.html',
  styleUrls: ['./productoptions.component.css'],
  providers: [MatSnackBar, MatDialog]
})
export class ProductoptionsComponent implements OnInit {

  productoptions: any;
  result: any;

  constructor(private poptionsService: ProductoptionsService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.poptionsService.getProductsoptionsubject.subscribe(() => {
      this.fetchProductoptions();
    })
  }

  fetchProductoptions() {
    this.poptionsService.getProductsoptions()
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.productoptions = this.result.data;
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  deleteProductoption(id: any) {
    this.poptionsService.deleteProductoptions(id)
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
            this.fetchProductoptions();
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  createProductoption() {
    this.dialog.open(ProductoptionsModalComponent, {
      width: '600px',
      data: { title: 'Add Product Options', button: 'Add', id: 0 },
    });
  }

  uploadProductoption() {
    this.dialog.open(ProductoptionsuploadModalComponent, {
      width: '600px',
      data: { title: 'Upload CSV File', button: 'Upload' },
    });
  }

  editProductoption(data: any) {
    this.dialog.open(ProductoptionsModalComponent, {
      width: '600px',
      data: { form: data, title: 'Update Product options', button: 'Update', id: data.id }
    });
  }

}
