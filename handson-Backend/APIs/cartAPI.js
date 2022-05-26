//create mini express app(card app)

const exp=require('express');

const cartApp=exp.Router();

const {createCart,viewCart} = require('../Controllers/cardController');





//create cart
cartApp.post('/create-cart',createCart);

//view cart
cartApp.get('/view-cart/:username',viewCart)


//export userApp
module.exports=cartApp;

