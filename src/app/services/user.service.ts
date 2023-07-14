import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private http:HttpClient) { }
userSignUP(user:any){
this.http.post("http://localhost:3000/users",user,{observe:"response"})
.subscribe((result)=>{
  console.warn(result)
})
}

}
