import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Login, cart, product, signUp } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  userList: any;
  deleteUserMessage: any;
  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }
  ngOnInit(): void {
    this.list();
    this.user.userAuthReload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data)
  }

  login(data: Login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = "user not found"
      } else {
        this.localCartToRemoteCart()
      }
    })
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data)

      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((res)=>{
            if(res){
             
            }
           })
           if(cartDataList.length === index+1){
              localStorage.removeItem('localCart')
           }
        }, 500);
      });

    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }

  list() {
    // Displaying the project in the Home Section 
    this.user.userList().subscribe((result) => {
      this.userList = result
      console.log("user", result);

    })
  }

  deleteUser(id: string) {
    this.user.deleteUser(id).subscribe((result) => {
      if (result) {
        this.deleteUserMessage = "Product is Removed"
        this.list()
      }
    })
    setTimeout(() => {
      this.deleteUserMessage = undefined
    }, 2000);
  }

}
