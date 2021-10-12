import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private ordersUrl = `https://printingpressapi.herokuapp.com/api/orders`;
  constructor(private http: HttpClient) { }
  public getOrderSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  getOrders(): Observable<any> {
    return this.http.get(this.ordersUrl);
  }

  getOrder(id: any) {
    return this.http.get(this.ordersUrl + '/' + id);
  }

  deleteProduct(id: any) {
    return this.http.delete(this.ordersUrl + '/' + id);
  }

  updateProducts(id: any, product: any) {
    return this.http.put(this.ordersUrl + '/' + id, product);
  }

}
