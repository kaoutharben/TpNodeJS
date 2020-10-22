// dependencies
const express= require('express');
const router=express.Router();
const requestHandlers=require('../requestHandlers');
var start=requestHandlers.start;


// routes
router.get('/',(request,response)=>start(response));


// exporting the content
module.exports=router;