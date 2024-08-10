import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order, product, signUp } from '../data-type';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon = faTrash
  iconEdit = faEdit  
  orderItems: order[] | undefined;
  userListData: any;
  deleteUserMessage: undefined | string;
  orderMessage: undefined | string;
  Visitors: number | undefined;
  productItems: number | undefined;
  orderCount: number | undefined;

  constructor(private product: ProductService,private user: UserService) { }

  ngOnInit(): void {
    this.list()
    this.order()
    this.userList()
  }

  deleteProduct(id: string) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is Removed"
        this.list()
      }
    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
  }

  deleteUser(id: string) {
    this.user.deleteUser(id).subscribe((result) => {
      if (result) {
        this.deleteUserMessage = "Product is Removed"
        this.userList()
      }
    })
    setTimeout(() => {
      this.deleteUserMessage = undefined
    }, 2000);
  }

  userList() {
    // Displaying the project in the Home Section 
    this.user.userList().subscribe((result) => {
      this.userListData = result
      this.userListData.reverse()
      this.Visitors = this.userListData.length
      console.log("user", result);

    })
  }

  list() {
    // Displaying the project in the Home Section 
    this.product.productList().subscribe((result) => {
    this.productList = result
    this.productItems = this.productList.length
    this.productList.reverse()
    })
  }

  order(){
    this.product.orderData().subscribe((res)=>{
      this.orderItems = res
      this.orderItems.reverse()
      this.orderCount = this.orderItems.length
    })
  }

  cancelOrder(orderId: number | undefined){
    this.product.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.orderMessage = "Order is Removed"
        this.order()
      }
    })
    setTimeout(() => {
      this.orderMessage = undefined
    }, 2000);
  }

}
