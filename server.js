//create express app
const exp=require("express");
const req = require("express/lib/request");
const path = require("node:path/posix");
const app=exp();
require("dotenv").config()

// connect to backend
app.use(exp.static(path.join(__dirname,'./dist/meanapp')))
//Connecting to MONGODB SERVER
//import MongoClient
const mongoClient=require("mongodb").MongoClient;
const dburl= process.env.DBURL;

//connect to DB
mongoClient.connect(dburl)
.then((client)=>{
    //get database  object
    let databaseObject=client.db("CDB22DX009DB");
    //get collecetion objects
    let userCollectionObject=databaseObject.collection("usercollection");
    let productCollectionObject=databaseObject.collection("productcollection")
    let cartCollectionObject=databaseObject.collection("cartcollection")
    //share collection objects to APIs
    app.set("cartCollectionObject",cartCollectionObject)
    app.set("userCollectionObject",userCollectionObject)
    app.set("productCollectionObject",productCollectionObject)

    console.log("Connected to DB succesfully")
})
.catch(err=>console.log("err in connecting to Database",err))


//import apis
const userApp=require("./handson-Backend/APIs/userAPI")
const adminApp=require("./handson-Backend/APIs/adminAPI")
const cartApp=require("./handson-Backend/APIs/cartAPI")




//add body par
app.use(exp.json())

//if path is user, then execute userAPIs
app.use('/user',userApp)

//if path is admin, then execute adminAPIs

app.use('/admin',adminApp)

//if path is admin, then execute cartAPIs

app.use('/cart',cartApp)

app.use('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'./dist/meanapp/index.html'),err=>{

        if(err){

            next(err)

        }

    })

})

//handling invalid paths
app.use((req,res,next)=>{
    res.status(404).send({message:`The path ${req.url} does not exist`})
})

//handling errors
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

//assign port number
const PORT=4000 || process.env.PORT;
app.listen(PORT,()=>console.log(`HTTP Server Listening to ${PORT}`))