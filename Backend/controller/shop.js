const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated, isSeller } = require("../middleware/auth.js");
const { upload } = require("../multer.js");
const Shop = require("../model/shop.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const sendShopToken = require("../utils/shopToken.js");


//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};


router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({email});

    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          next(
            new ErrorHandler("User already exists and pic is not deleted", 400)
          );
        } else {
          next(new ErrorHandler("User already exists", 400));
        }
      });
      return;
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      shopName: req.body.shopName,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        mail: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.shopName}, please click on the link to activate your shop: ${activationUrl}`,
      });

      res.status(201).json({
        message: `Please check your email:- ${seller.email} to confirm your shop`,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

//activate seller
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log(activation_token);

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        console.log("user not verified");
        return next(new ErrorHandler("Inavlid Token", 400));
      }

      const { shopName, email, password, avatar, zipCode, address, phoneNumber } = newSeller;
      const userEmail = await Shop.findOne({ email });

    if(userEmail){
      console.log("account already created");
      return next(new ErrorHandler("User Already Exists", 400));
    }

      let createdSeller = await Shop.create({
        shopName,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber
      });

      console.log(createdSeller);
      console.log(createdSeller.email);

      sendShopToken(createdSeller, 201, res);
    } catch (e) {
        console.log("catch error: "+e.message);
      return next(new ErrorHandler(e.message, 500));
    }
  })
);


//login seller
router.post("/login-shop", catchAsyncError(async (req, res, next)=>{

  try{

    console.log("login called");
    const { email, password}= req.body;
    if(!email || !password){
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const user= await Shop.findOne({email}).select("+password");

    if(!user){
      return next(new ErrorHandler("User does not exists", 400));
    }

    const isPasswordValid= await user.comparePassword(password);

    if(!isPasswordValid){
      return next(new ErrorHandler("Invalid Credentials!"));
    }

    sendShopToken(user, 201, res);

  }catch(e){

  }
}))


//loadShop
router.get("/getSeller", isSeller, catchAsyncError(async (req, res, next)=>{
  try{
    const seller= await Shop.findById(req.seller._id);
    if(!seller){
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller
    });

  }catch(e){
    return next(new ErrorHandler(e.message, 500));
  }
}))


//log-out shop
router.get("/logout", catchAsyncError(async (req, res, next)=>{
  try{

    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: "Log out successful!"
    });
    
  }catch (error) {
    return next(new ErrorHandler(error.message, 500))    
  }
}))


// get shop info
router.get("/get-shop-info/:id", catchAsyncError(async (req, res, next)=>{
  try {
      const shop= await Shop.findById(req.params.id);

      res.status(201).json({
        success: true,
        shop
      });
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}))




module.exports = router;
