import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { SchemeService } from '../services/scheme.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  schemeList: any;
  userList: any;
  cartListData: any;
  messageList: any;
  deleteUserMessage: string | undefined;
  constructor(private user: UserService, private schm: SchemeService) { }
  ngOnInit(): void {

    this.schemeData()
    this.userData()
    this.messageListt()
  }

  schemeData(){
    this.schm.schemeList().subscribe((res)=>{
      this.schemeList =  res
    })
  }

  userData(){
    this.user.userList().subscribe((res)=>{
      this.userList =  res
    })
  }

  messageListt(){
    this.schm.messageList().subscribe((res)=>{
      this.messageList =  res
    })
  }

  deleteUser(id: any){
    this.user.deleteUser(id).subscribe((res)=>{
       alert("User is Removed")
    })
    this.userData()
  }

}
