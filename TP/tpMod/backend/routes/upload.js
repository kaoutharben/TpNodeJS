// dependencies
const express= require('express');
const router=express.Router();
const requestHandlers=require('../requestHandlers');
var upload=requestHandlers.upload;


// routes
router.get('/',(request,response)=>upload(response));


// exporting the content
module.exports=router;