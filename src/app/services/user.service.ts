import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth= new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: signUp){
    this.http.post("http://localhost:3000/user",user,{observe: 'response'})
    .subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body))
        this.router.navigate(['/'])
      }
    })
  }

  userLogin(data:Login){
    this.http.get<signUp[]>(`http://localhost:3000/user?email${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((res:any)=>{
      if(res && res.body?.length){
        localStorage.setItem('user',JSON.stringify(res.body[0]))
        this.router.navigate(['/home'])
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
  })}
  // https://retoolapi.dev/N4gZ0H/user

  userList(){
    return this.http.get<any>("http://localhost:3000/user/");
  }

  deleteUser(id:any){
    return this.http.delete(`http://localhost:3000/user/${id}`)
}

userAuthReload(){
  if(localStorage.getItem('user')){
    this.router.navigate(['/'])
  }
}
}

