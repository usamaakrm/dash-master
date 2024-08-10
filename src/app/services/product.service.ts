import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>()

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    console.log(data);
    return this.http.post("https://retoolapi.dev/4h9N2p/product", data)
  }

  productList() {
    return this.http.get<product[]>("https://retoolapi.dev/4h9N2p/product/");
  }

  deleteProduct(id: string) {
    return this.http.delete(`https://retoolapi.dev/4h9N2p/product/${id}`)
  }

  getProduct(id: any) {
    return this.http.get<product>(`https://retoolapi.dev/4h9N2p/product/${id}`)
  }

  // update the product
  updateProduct(product: product) {
    return this.http.put<product>(`https://retoolapi.dev/4h9N2p/product/${product.id}`, product)
  }

  searchProduct(query: string) {
    return this.http.get<product[]>(`https://retoolapi.dev/4h9N2p/product?q=${query}`)
  }

  localAddtoCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      //  localcart is keyname below  
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data])
    }
    else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: product[] = JSON.parse(cartData)
      items = items.filter((item: product) => 
        productId !== item.id)
        localStorage.setItem('localCart', JSON.stringify(items))
       this.cartData.emit(items)
    }
  }

  addToCart(cartData: cart){
    return this.http.post("https://retoolapi.dev/Qn0zgj/cart", cartData)
  }

  getCartList(userId: number){
    return this.http.get<product[]>("https://retoolapi.dev/Qn0zgj/cart?userId="+userId,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body)
      }
    })
  }

  removeToCart(cartId: number){
    return this.http.delete("https://retoolapi.dev/Qn0zgj/cart/"+ cartId)
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>("https://retoolapi.dev/Qn0zgj/cart?userId="+userData.id)
  }

  orderNow(data:order){
    return this.http.post("https://retoolapi.dev/r9WIUU/order", data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>("https://retoolapi.dev/r9WIUU/order?userId="+userData.id)
  }

  deleteCartItems(cartId: number){
    return this.http.delete("https://retoolapi.dev/Qn0zgj/cart/"+ cartId,{observe:'response'}).
    subscribe((res)=>{
      if(res){
        this.cartData.emit([])
      }
    })
  }

  cancelOrder(orderId:number | undefined){
    return this.http.delete("https://retoolapi.dev/r9WIUU/order/"+ orderId)
  }


  //   admin

  cartListAdmin() {
    return this.http.get<cart[]>("https://retoolapi.dev/Qn0zgj/cart/");
  }

  orderData(){
    return this.http.get<order[]>("https://retoolapi.dev/r9WIUU/order/")
  }
}
