import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoptionsService } from 'app/common/services/productoptions.service';

@Component({
  selector: 'app-productoptions-modal',
  templateUrl: './productoptions-modal.component.html',
  styleUrls: ['./productoptions-modal.component.css']
})
export class ProductoptionsModalComponent implements OnInit {

  data = null;
  id: any;
  title: any;
  button: any;
  productoption: any;
  myFile: any;
  selectedFile: any;

  constructor(private poptionService: ProductoptionsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductoptionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    dialogRef.disableClose = true;
    this.data = data.form
    this.title = data.title
    this.button = data.button
    this.id = data.id
  }

  ngOnInit() {
    if (this.data != null) {
      this.poptions_form.controls['p_id'].setValue(this.data.p_id);
      this.poptions_form.controls['product_id'].setValue(this.data.product_id);
      this.poptions_form.controls['product_type'].setValue(this.data.product_type);
      this.poptions_form.controls['quantity'].setValue(this.data.quantity);
      this.poptions_form.controls['finishing_size'].setValue(this.data.finishing_size);
      this.poptions_form.controls['printed_pages'].setValue(this.data.printed_pages);
      this.poptions_form.controls['stock'].setValue(this.data.stock);
      this.poptions_form.controls['cover'].setValue(this.data.cover);
      this.poptions_form.controls['lamination'].setValue(this.data.lamination);
      this.poptions_form.controls['one_day'].setValue(this.data.one_day);
      this.poptions_form.controls['two_day'].setValue(this.data.two_day);
      this.poptions_form.controls['three_day'].setValue(this.data.three_day);
      this.poptions_form.controls['seven_day'].setValue(this.data.seven_day);
      this.poptions_form.controls['vat'].setValue(this.data.vat);
    }
  }


  poptions_form = new FormGroup({
    p_id: new FormControl(''),
    product_id: new FormControl(''),
    product_type: new FormControl(''),
    quantity: new FormControl(''),
    finishing_size: new FormControl(''),
    printed_pages: new FormControl(''),
    stock: new FormControl(''),
    cover: new FormControl(''),
    lamination: new FormControl(''),
    one_day: new FormControl(''),
    two_day: new FormControl(''),
    three_day: new FormControl(''),
    seven_day: new FormControl(''),
    vat: new FormControl('')
  });


  submitProductoption() {

    this.productoption = this.poptions_form.value;
    delete this.productoption.image;
    if (this.id == 0) {
      this.poptionService.addProductoptions(this.productoption)
        .subscribe(
          response => {
            this.dialogRef.close();
            this.poptionService.getProductsoptionsubject.next(true);
          }
        )
    } else if (this.id > 0) {
      this.poptionService.updateProductsoptions(this.id, this.productoption)
        .subscribe(
          response => {
            this.dialogRef.close();
            this.poptionService.getProductsoptionsubject.next(true);
          }
        )
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
