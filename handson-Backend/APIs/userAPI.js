//create mini express app(user app)
const exp=require("express")
const req = require("express/lib/request")
const res = require("express/lib/response")
const {getUsers,
        getUserByUsername, 
        createUser, 
        updateUser, 
        deleteUser,
        loginUser,
        getProtectedInfo} = require("../Controllers/userContoller");
const verifyToken = require("../middlewares/verifyToken");

const cloudinary = require('cloudinary').v2;

const {CloudinaryStorage}=require("multer-storage-cloudinary")

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

          folder: 'cdb22dx009',

          //format: async (req, file) => 'png', // supports promises as well

          public_id: (req, file) => file.fieldname+'-'+ Date.now(),

        },

      });



//configure multer

const upload = multer({storage:cloudStorage})


const userApp=exp.Router();


//Create USER API

//get users
userApp.get('/get-users',getUsers)

//get user by username
userApp.get('/get-user/:username',getUserByUsername)

//create users
userApp.post('/create-user',upload.single('profilePic'),createUser)

//update user
userApp.put("/update-user",updateUser)

//login user
userApp.post('/login-user',loginUser)

//delete user
userApp.delete("/remove-user/:username",deleteUser)

//producted route
userApp.get("/get-protected-data",verifyToken,getProtectedInfo)



//export userApp
module.exports=userApp;