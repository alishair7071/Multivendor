const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("../db/Database.js"); // adjust path if needed
const ErrorHandler = require("../middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("cloudinary");

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
});

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://frontend-multivendor.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/test", (req, res) => {
  res.send("hello world");
});

// Connect DB
connectDatabase();

cloudinary.config({
  cloud_name: dqf4fxp4x,
  api_key: 744127157597433,
  api_secret: NuleBAZD0CDcgJseAwphgug2W0w,
});

// Routes
const user = require("../controller/user.js");
const shop = require("../controller/shop.js");
const product = require("../controller/product.js");
const event = require("../controller/event.js");
const coupon = require("../controller/coupounCode.js");
const payment = require("../controller/payment.js");
const order = require("../controller/order.js");
const conversation = require("../controller/conversation.js");
const message = require("../controller/message.js");
const withdraw = require("../controller/withdraw.js");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// Error handling
app.use(ErrorHandler);

/*
//create server
app.listen(process.env.PORT, ()=>{
    console.log("abc");
    console.log(`Server is running on the port: ${process.env.PORT}`);
});
*/

// Instead of app.listen(), export the app for Vercel
module.exports = app;
