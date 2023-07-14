import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { any } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  addProduct(data:any){
  return  this.http.post('http://localhost:3000/products',data);
  }
  productList(){
    return this.http.get<any[]>('http://localhost:3000/products')
  }
  productDelete(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id:string){
    return this.http.get<any>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(any:any){
    return this.http.put<any>(`http://localhost:3000/products/${any.id}`,any)
  }
  popularProducts(){
    return this.http.get<any[]>('http://localhost:3000/products?_limit=2')
  }
  trendyProducts(){
    return this.http.get<any[]>('http://localhost:3000/products?_limit=6')
  }
  searchProduct(query:string){
    return this.http.get<any[]>(`http://localhost:3000/products?q=${query}`)
  }
}
