// dependencies
const express= require('express');
const router=express.Router();
const requestHandlers=require('../requestHandlers');
var find=requestHandlers.find;


// routes
router.get('/',(request,response)=>find(response));


// exporting the content
module.exports=router;