import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userFormInfo:FormGroup;

  errMessage:string;

  errStatus:boolean=false;

  image:File;

  constructor(private fb:FormBuilder,private us:UserserviceService,private router:Router) { }



  ngOnInit(): void {

    this.userFormInfo=this.fb.group({

      username:'',

      password:'',

      city:'',

      email:'',

      profilePic:''

     

    })

  }



  onFormSubmit(){

    // console.log(this.userObj.value)

    //get user obj from form

    let userObj=this.userFormInfo.value;

    //create FormData object

    let formData=new FormData();

    //append userObj to formData

    formData.append('userObj',JSON.stringify(userObj))

    //append profilepic to formData

    formData.append('profilePic',this.image)

    this.us.createUser(formData).subscribe({

      next:(res)=>{

        if(res.message=="User created"){

          //navigate by login component

          this.errStatus=false

          //this.router.navigateByUrl('/login')

        }

        else{

          this.errStatus=true;

          this.errMessage=res.message

        }

      },

      error:()=>{}

    })

    

  }

  onFileSelect(event){

    // console.log(event.target.files[0]);

    this.image = event.target.files[0]

  }

  

 

}
