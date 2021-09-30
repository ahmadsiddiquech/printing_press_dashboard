import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'app/common/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [MatSnackBar, MatDialog]
})
export class OrdersComponent implements OnInit {
  result: any;
  orders: any;

  constructor(private orderService: OrdersService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.getOrderSubject.subscribe(() => {
      this.fetchOrders();
    })
  }

  fetchOrders() {
    this.orderService.getOrders()
      .subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.orders = this.result.data;
          }
        },
        error => {
          console.log(error)
        }
      )
  }

}
