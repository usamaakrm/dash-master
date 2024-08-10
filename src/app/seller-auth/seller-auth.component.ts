import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from "@angular/router";
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  showLogin:boolean = false;
  authError:string = "";
  
  constructor(private seller: SellerService){}
  ngOnInit():void {
    this.seller.reloadseller()
  }
  // void use for not returning function
  // signup is interface
  signUp(data:signUp): void{
     this.seller.userSignUp(data)
  }

  login(data:signUp): void{
    this.seller.userLogin(data);
    
    this.seller.isLoginError.subscribe((isError)=>{
       if(isError){
        this.authError="Email or Password is not Match"
       }
    })
  }
  

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }
}
