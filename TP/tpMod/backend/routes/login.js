// dependencies
const express= require('express');
const router=express.Router();
const requestHandlers=require('../requestHandlers');
var login=requestHandlers.login;


// routes
router.get('/',(request,response)=>login(response));


// exporting the content
module.exports=router;