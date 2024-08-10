import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceData } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSum: priceData = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
constructor(private product: ProductService, private router: Router){}
ngOnInit():void{
  this.loadDetails();
}

removeToCart(cartId: number | undefined){
  cartId && this.product.removeToCart(cartId)
  .subscribe((res)=>{
    this.loadDetails();
  })
}

checkout(){
  this.router.navigate(['/checkout'])
}

loadDetails(){
  this.product.currentCart().subscribe((res)=>{
    this.cartData = res
    let price = 0
    res.forEach((item)=>{
     if(item.quantity){
       price =  price + (+item.price * +item.quantity)
       console.log(price,"price");
       
     }
    })
    this.priceSum.price = price
    this.priceSum.discount = price/10
    this.priceSum.tax = price/5
    this.priceSum.delivery = 100
    this.priceSum.total = price+(price/10)+100-(price/10)
    if(!this.cartData.length){
      this.router.navigate(['/'])
    }
  })
}
}
