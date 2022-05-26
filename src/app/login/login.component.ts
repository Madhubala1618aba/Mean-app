import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails:FormGroup;
  errStatus;
  errMessage;
  

 constructor(private fb:FormBuilder, private authService:LoginService, private router:Router) { }
 ngOnInit(): void {

    this.loginDetails=this.fb.group({

      usertype:[''],

      username:[''],

      password:['']

    })

  }
detailsSubmit(){

    console.log(this.loginDetails.value)

    //if usertype is user

    if(this.loginDetails.value.usertype=='user'){

      this.authService.loginUser(this.loginDetails.value).subscribe({

        next:(res)=>{

          //console.log(res)

          if(res.message=='success'){

            this.errStatus=false;



            //get token from res obj

            let token=res.token;

            //store token in localstorage

            localStorage.setItem("token",token)

            //update user login status

            this.authService.userLoginStatus=true;

            //get loggedin user details

            this.authService.currentUser=res.user;

            //navigate to userdashboard

            this.router.navigateByUrl(`/userprofile/${res.user.username}`)

          }

          else{

            this.errStatus=true;

            this.errMessage=res.message;

          }

        },

        error:(err)=>{

          alert(err.message)

        }

      })

    }

    //if userType is admin

    if(this.loginDetails.value.usertype=='admin'){

      //console.log(this.loginDetails.value);

      this.authService.loginAdmin(this.loginDetails.value).subscribe({

        next:(res)=>{

          //get token from res obj

          let token=res.token;

          //store token in localstorage

          localStorage.setItem("token",token)

         

          //update admin login status

          this.authService.userLoginStatus=true;



          //navigate to userdashboard

          this.router.navigateByUrl('/adminprofile')

        },

        error:(err)=>{

          console.log("err is",err.message);

        }

      })



    }

  }
}

