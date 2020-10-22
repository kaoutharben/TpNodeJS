// dependencies
const express= require('express');
const router=express.Router();
const requestHandlers=require('../requestHandlers');
var logout=requestHandlers.logout;


// routes
router.get('/',(request,response)=>logout(response));


// exporting the content
module.exports=router;