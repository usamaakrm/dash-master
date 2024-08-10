import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, order, priceData } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  ordermsg: string | undefined;
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0
      this.cartData = res
      res.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10)
    })
  }

  orderDataForm(data: any) {
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
    if(this.totalPrice){
      let orderData: order={
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }

      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 800);
      })
      this.product.orderNow(orderData).subscribe((res)=>{
        if(res){
          this.ordermsg = "your order is placed"
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.ordermsg = undefined
          }, 4000);
        }
      })
    }
  }


}
