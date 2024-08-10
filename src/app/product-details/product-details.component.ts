import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productData: undefined | product
  productQuantity: number = 1;
  removeCart = false
  cartData: product| undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result

      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        // parse is used to store data in JSON format
        let items = JSON.parse(cartData)
        items = items.filter((item: product) =>
          productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        }
        else {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user')
      // we are getting user id from localstorage
      if(user){
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
        this.product.cartData.subscribe((res)=>{
           let item = res.filter((item:product)=> 
           productId?.toString()===item.productId?.toString())
           if(item.length){
              this.cartData = item[0]
              this.removeCart = true
           }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        console.log(this.productData);
        this.product.localAddtoCart(this.productData)
        this.removeCart = true
      }
      else {
        let user = localStorage.getItem('user')
        // we are getting user id from localstorage
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productData, userId,
          productId: this.productData.id,
        }
        // we are deleting product id
        delete cartData.id
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  removeToCart(productId: string) {
    if(!localStorage.getItem('user')){
      this.product.removeItemFromCart(productId)
      this.removeCart = false;
    }
    else{
      let user = localStorage.getItem('user')
      // we are getting user id from localstorage
      let userId = user && JSON.parse(user).id
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((res)=>{
        if(res){
          this.product.getCartList(userId)
            }
      })
          this.removeCart = false;
    }
  }

}
