import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminprofileComponent implements OnInit {

  productForm:FormGroup;
  allProducts;
  errStatus:boolean=false;
  errMessage;
  image:File;

  constructor(private fb:FormBuilder,private us:UserserviceService,private router:Router) { }
  ngOnInit(): void {
    this.productForm=this.fb.group({
      productId:'',
      productName:'',
      price:'',
      description:'',
      productImage:''
    })
  }

    onFormSubmit(){
    //console.log(this.productForm.value)

    //get user obj from form
    let productObj=this.productForm.value;
      //create FormData object
    let formData=new FormData();
    //append userObj to formData
    formData.append('productObj',JSON.stringify(productObj))
    //append profilepic to formData
    formData.append('productImage',this.image)

    if(productObj.productId==""){
      alert('Fill the required fields')
    }
    else{
    this.us.createproduct(formData).subscribe({
      next:(res)=>{
        if(res.message=="Product created"){
          //navigate by login component
          this.errStatus=false
          alert("User Created Successfully")
        }
        else{
          this.errStatus=true;
          this.errMessage=res.message
        }    
  
        },
        error:(err)=>{
          console.log("product err",err)
        }
      })
    }
  }
  onImageSelect(event){
    //console.log(event.target.files[0]);
    this.image = event.target.files[0]
  }

  getProducts(){
    this.us.getProduct().subscribe({
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

  editProduct(index,product){
    console.log("index",index,product);
  }

  deleteUser(id){
    console.log(id)
    this.us.deleteProductbyId(id).subscribe({
      next:(response)=>{
        console.log(response)
        //alert("User removed")
        //this.getUsersList()
        //update count
        //this.us.updateProductCountObservable(this.us.getCurrentProductCount()-1)
      },
      error:(error)=>{
        console.log("err is ",error)
      }
    })
  }

    

  

  }
