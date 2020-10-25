//const server1 = require("./Server");
var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");




    mongoose.connect("mongodb+srv://admin:123@cluster0.hloif.mongodb.net/TP1?retryWrites=true&w=majority", { useNewUrlParser: true });    
    var app = express();
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(require("express-session")({
        secret:"Miss white is my cat",
        resave: false,
        saveUninitialized: false
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    
    
    
    app.get("/",function(req, res){
        res.render("home"); 
    });
    
    app.get("/secret", isLoggedIn, function(req, res){
        res.render("secret");
    });
    
    app.get("/register", function(req, res){
        res.render("register");
    });
    
    // handeling user sign up
    app.post("/register", function(req, res){
        console.log(req.body.username);
        console.log(req.body.password);
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        });
    });
    
    // Login Form
    app.get("/login", function(req, res){
        res.render("login");
    });
    
    // Login Logic
    // middleware
    app.post("/login", passport.authenticate("local",{
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), function(req, res){
        console.log(req.body.username);
    });
    
    // Logout
    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
    });
    
    // check isLoggedIn
    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
    
    


var requestHandlers = require("./RequestHandlers");

app.get('/upload', isLoggedIn, (req, res) => {
    requestHandlers.upload(res)
});
app.get('/find', (req, res) => {
    requestHandlers.find(res)
});
app.get('/show', (req, res) => {
    requestHandlers.show(res)
});

app.listen(3333, function(){
    console.log('started app')
});
//server1.start(router.route, handle);
/*app.get("/start" ,requestHandlers.start(res));
app.get("/upload",requestHandlers.upload(res));
app.get("/find", requestHandlers.find(res));
app.get("/show", requestHandlers.show(res));
app.get("/login", requestHandlers.login(res));
app.get("/logout",requestHandlers.logout(res));*/
