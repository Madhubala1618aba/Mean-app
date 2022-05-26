import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { UserserviceService } from 'src/app/userservice.service';

@Component({
  selector: 'app-veiwcart',
  templateUrl: './veiwcart.component.html',
  styleUrls: ['./veiwcart.component.scss']
})
export class VeiwcartComponent implements OnInit {

  user;

  cartProduct;

  constructor(private authService:LoginService,

    private us:UserserviceService,) { }



  ngOnInit(): void {

    this.user=this.authService.currentUser;

    this.viewCart(this.user.username);

  }



  private viewCart(username){

    this.us.viewCart(username).subscribe({

      next:(res)=>{



        let user=res['payload']

        //console.log(user)

        this.cartProduct=user.products;

        //console.log("cart product",this.cartProduct)

        // this.router.navigateByUrl(`/userprofile/viewcart/${username}`)

      },

      error:(err)=>{
        console.log("viewcart err",err)

      }

    })

  }

}
