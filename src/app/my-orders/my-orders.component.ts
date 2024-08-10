import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {
  // order[]
  orderData: order[] | undefined
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((res) => {
      this.getOrderList();
    })
    this.getOrderList();
  }

  getOrderList() {
    this.product.orderList().subscribe((res) => {
      this.orderData = res
    })
  }
}
