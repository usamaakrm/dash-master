import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data:signUp){
    return this.http.post("http://localhost:3000/seller", data, 
    {observe: 'response'})
    .subscribe((result)=>{
            this.isSellerLoggedIn.next(true);
            localStorage.setItem('seller', JSON.stringify(result.body))
            this.router.navigate(['admin'])
      })
  }
  reloadseller(){
    // already signed by the user
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['admin'])
    }
  }

  userLogin(data:Login){
    this.http.get(`http://localhost:3000/seller?email${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
       if(result && result.body && result.body.length){
        this.isLoginError.emit(false)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['admin'])
       }
       else{
        console.warn("login failed");
        this.isLoginError.emit(true)
       }
    })
  }

}

