import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoptionsService } from 'app/common/services/productoptions.service';

@Component({
  selector: 'app-productoptionsupload-modal',
  templateUrl: './productoptionsupload-modal.component.html',
  styleUrls: ['./productoptionsupload-modal.component.css']
})
export class ProductoptionsuploadModalComponent implements OnInit {

  title: any;
  button: any;
  selectedFile: any;

  constructor(private poptionService: ProductoptionsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductoptionsuploadModalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    dialogRef.disableClose = true;
    this.title = data.title
    this.button = data.button
  }

  ngOnInit() {

  }


  product_form = new FormGroup({
    file: new FormControl(''),
  });




  submitProductoptionupload() {
    this.dialogRef.close();

    const formdata = new FormData();
    formdata.append('file', this.selectedFile, this.selectedFile.name);
    this.poptionService.updateProductsoptionsCSV(formdata)
      .subscribe(
        response => {
          this.dialogRef.close();
          this.poptionService.getProductsoptionsubject.next(true);
        }
      )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

}
