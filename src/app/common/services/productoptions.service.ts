import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoptionsService {

  private productsoptionsUrl = `http://localhost:3000/api/productoptions`;
  constructor(private http: HttpClient) { }
  public getProductsoptionsubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  getProductsoptions(): Observable<any> {
    return this.http.get(this.productsoptionsUrl);
  }

  getProductoptions(id: any) {
    return this.http.get(this.productsoptionsUrl + '/' + id);
  }

  addProductoptions(productoptions: any) {
    return this.http.post(this.productsoptionsUrl, productoptions);
  }

  deleteProductoptions(id: any) {
    return this.http.delete(this.productsoptionsUrl + '/' + id);
  }

  deleteAllProductoptions() {
    return this.http.delete(this.productsoptionsUrl + '/delete_all/' + 0);
  }

  updateProductsoptions(id: any, productoptions: any) {
    return this.http.put(this.productsoptionsUrl + '/' + id, productoptions);
  }

  updateProductsoptionsCSV(productoptions: any) {
    return this.http.post(this.productsoptionsUrl + '/upload_csv/', productoptions);
  }
}
