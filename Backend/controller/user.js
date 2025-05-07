const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user.js");
const { upload } = require("../multer.js");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const sendToken = require("../utils/jwtToken.js");

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });


    if (userEmail) {
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

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        mail: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        message: `Please check your email:- ${user.email} to confirm your account`,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});

//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log(activation_token);

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        console.log("user not verified");
        return next(new ErrorHandler("Inavlid Token", 400));
      }

      const { name, email, password, avatar } = newUser;
      const userEmail = await User.findOne({ email });

    if(userEmail){
      console.log("account already created");
      return next(new ErrorHandler("User Already Exists", 400));
    }

      let createdUser = await User.create({
        name,
        email,
        password,
        avatar,
      });

      console.log(createdUser);
      console.log(createdUser.email);

      sendToken(createdUser, 201, res);
    } catch (e) {
        console.log("catch error: "+e.message);
      return next(new ErrorHandler(e.message, 500));
    }
  })
);


//login 
router.post("/login-user", catchAsyncError(async (req, res, next)=>{

  try{

    console.log("login called");
    const { email, password}= req.body;
    if(!email || !password){
      return next(new ErrorHandler("Please provide all the fields", 400));
    }

    const user= await User.findOne({email}).select("+password");

    if(!user){
      return next(new ErrorHandler("User does not exists", 400));
    }

    const isPasswordValid= await user.comparePassword(password);

    if(!isPasswordValid){
      return next(new ErrorHandler("Invalid Credentials!"));
    }

    sendToken(user, 201, res);

  }catch(e){

  }
}))

module.exports = router;
