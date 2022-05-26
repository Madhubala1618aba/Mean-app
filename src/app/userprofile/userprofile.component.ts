import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserserviceService } from '../userservice.service';
import {CartserviceService } from '../cartservice.service'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
cartProduct;
cartCount;
  user;
 allProducts
  constructor(private logService:LoginService,private userService:UserserviceService,private router:Router,private cs:CartserviceService) { }

  ngOnInit(): void {

  this.user=this.logService.currentUser;
  this.getProducts()
  //cart count

  this.userService.viewCart(this.user?.username).subscribe({

    //update BahaviourSubject in UserService

    next:(res)=>{

      //console.log("CP",res)

      let userObj=res['payload']
      this.cartProduct=userObj.products;
      this.cs.updateCartCountObservable(this.cartProduct.length)

      //get latest cartCount
        this.cs.productCountObservable.subscribe(product=>{
        this.cartCount=product;

      })

    },

    error:(error)=>{
      console.log(error)
      alert("Error in reading")

    }

  })


  }

  private getProducts(){
    this.userService.getProduct().subscribe({
      next:(products)=>{
        //console.log(products);
        //console.log("Products",products['payload']);
        this.allProducts=products['payload'];
        //console.log(this.allProducts[0].productName)
      },

      error:(err)=>{
        console.log("err",err);
      }
    })

  }

  getPrivateData(){
    this.userService.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message)
      }
    })
  }

  Addcart(username,product){
  // console.log(username,product);
  let cartObj={
    username:username,
    products:[product]

  }

  //console.log(cartObj);
  this.userService.addcart(cartObj).subscribe({
    next:(res)=>{
      // console.log(res)
      alert("Added to cart successfully")
      //update count
      this.cs.updateCartCountObservable(this.cs.getCurrentCartCount()+1)
    },

    error:(err)=>{
      console.log("cart error",err)
    }
  })
  }
  viewcart(username){
    this.router.navigateByUrl(`/userprofile/viewcart/${username}`)
  }

}
