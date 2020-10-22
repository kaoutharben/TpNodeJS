//const server1 = require("./Server");
const app = require('express')();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected…')
})
.catch(err => console.log(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(3333, () => {
console.log(`Server running at here 3333`);
});
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser,getUserDetails } = require('./controller/authcontroller');
app.post('/api/users/register',RegisterUser);
app.post('/api/users/login',LoginUser);
app.get('/api/users/auth',auth,getUserDetails);
app.get('/api/users/logout', auth, LogoutUser);

var requestHandlers = require("./RequestHandlers");




app.get('/', (req, res) => {
    requestHandlers.start(res)
});
app.get('/start', (req, res) => {
    requestHandlers.start(res)
});
app.get('/upload', (req, res) => {
    requestHandlers.upload(res)
});
app.get('/find', (req, res) => {
    requestHandlers.find(res)
});
app.get('/show', (req, res) => {
    requestHandlers.show(res)
});

app.get('/logout', (req, res) => {
    requestHandlers.logout(res)
});



//server1.start(router.route, handle);
/*app.get("/start" ,requestHandlers.start(res));
app.get("/upload",requestHandlers.upload(res));
app.get("/find", requestHandlers.find(res));
app.get("/show", requestHandlers.show(res));
app.get("/login", requestHandlers.login(res));
app.get("/logout",requestHandlers.logout(res));*/
