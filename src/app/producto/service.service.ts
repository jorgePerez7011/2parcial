import { ProductoInterface } from './../interface/producto-interface';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) {}

  baseUrl = environment.api +"/products";
  data = this.http.get(this.baseUrl);

  getAll() : Observable<any>{
    return  this.data
  }

  getOne(id : string):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  postProducto(data : any):Observable<any>{
    return this.http.post(this.baseUrl, data)
  }

  putProducto(id: any, data: any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`, data)
  }

  deleteProducto(id : string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }


}
