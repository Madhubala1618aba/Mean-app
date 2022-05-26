const exp=require("express");
const { adminLogin, createProduct, getProducts, updateProduct, deleteProduct } = require("../Controllers/adminController");
const adminApp= exp.Router();

const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const multer=require('multer');


//confidure clodinary
cloudinary.config({
    cloud_name:"madhubala",

    api_key:"252355547884197",

    api_secret:"2kcSiIRo-gG2xB-sLLJ8YI3DxJ4"

})

//configure multer-storage-cloudinary
const cloudStorage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'ProductImg',
          //format: async (req, file) => 'png', // supports promises as well
          public_id: (req, file) => file.fieldname+'-'+ Date.now(),
        },
      });

//configure multer
const upload = multer({storage:cloudStorage})


//admin app
adminApp.post("/login",adminLogin)

//create product
adminApp.post("/create-product",upload.single('productImage'),createProduct)

//view products
adminApp.get('/view-products',getProducts)

//update product
adminApp.put('/update-product',updateProduct)

//remove product by id
adminApp.delete('/delete/:id',deleteProduct)




//export adminApp
module.exports=adminApp;