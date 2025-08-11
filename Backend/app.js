const express= require('express');
const ErrorHandler = require('./middleware/error.js');
const app= express();
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const cors= require('cors');
require("dotenv").config();

app.use(express());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use("/", express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));


//config
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'config/.env'});
}


//import routes
const user= require('./controller/user.js');
const shop= require('./controller/shop.js');
const product= require("./controller/product.js");
const event= require("./controller/event.js");
const coupon= require("./controller/coupounCode");
const payment= require("./controller/payment.js");
const order= require("./controller/order.js");
const conversation= require("./controller/conversation.js");
const message= require("./controller/message.js");



app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);



app.use(ErrorHandler);
module.exports = app;
