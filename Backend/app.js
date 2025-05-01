const express= require('express');
const ErrorHandler = require('./middleware/error.js');
const app= express();
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const cors= require('cors');

app.use(express());
app.use(cookieParser());
app.use(cors());
app.use("/", express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));


//config
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'config/.env'});
}


//import routes
const user= require('./controller/user.js');

app.use("/api/v2/user", user);


app.use(ErrorHandler);

module.exports = app;
