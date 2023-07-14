import { EventEmitter, Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';
// import { login, any } from '../data-type';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn=new BehaviorSubject<boolean>(false);
loginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:any){
    console.warn("service callde")
    return this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:any){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body &&result.body.length === 1){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home'])
      }else{
        this.loginError.emit(true)
        console.warn('login failed')
      }
    })
    console.warn(data)
  }
}
