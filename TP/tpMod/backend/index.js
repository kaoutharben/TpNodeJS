const express=require("express");
const app =express();
const port = 8888;
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

// static web server
app.use(express.static(path.join(__dirname,'dist')));



// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// REST API
app.use('/',require('./routes/start.js'));
app.use('/start',require('./routes/start.js'));
app.use('/upload',require('./routes/upload.js'));
app.use('/find',require('./routes/find.js'));
app.use('/show',require('./routes/show.js'));
app.use('/login',require('./routes/login.js'));
app.use('/logout',require('./routes/logout.js'));
app.use('*',(req, res)=>{
  res.status(404).send('<h1>Error 404 : Not found </h1>');
});



app.listen(port, function (error) {
    if (error) {
      console.log("Error : ", error);
    } 

    else {
      console.log("Server listening on port " + port);
    }
  }
    );


