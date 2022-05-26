import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private hc:HttpClient) { }



  createUser(userObj):Observable<any>{
    return this.hc.post('/user/create-user',userObj)

  }


  createproduct(productObj):Observable<any>{
    return this.hc.post('/admin/create-product',productObj);

  }

  addcart(productObj):Observable<any>{

    return this.hc.post('/cart/create-cart',productObj);

  }

  viewCart(username):Observable<any[]>{
    return this.hc.get<any[]>(`/cart/view-cart/${username}`)
  }

  getProduct():Observable<any[]>{

    return this.hc.get<any[]>('/admin/view-products');

  }



  deleteProductbyId(id):Observable<any>{

    return this.hc.delete(`/admin//delete/${id}`);

  }

  // make req to protected route
  getProtectedData():Observable<any>{
   return this.hc.get("/user//get-protected-data")
  }
}
