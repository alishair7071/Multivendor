const express = require("express");
const path= require("path");
const router= express.Router();
const User= require("../model/user.js")
const {upload}= require("../multer.js");
const user = require("../model/user.js");
const ErrorHandler = require("../utils/ErrorHandler");
const fs= require('fs');

router.post("/create-user", upload.single("file"), async (req, res, next)=> {
    const {name, email, password}= req.body;
    const userEmail= await User.findOne({email});

    if(userEmail){
        const filename= req.file.filename;
        const filePath= `uploads/${filename}`;
        fs.unlink(filePath, (err)=>{
            if(err){
                next(new ErrorHandler("User already exists and pic is not deleted", 400));
            }else{
                next(new ErrorHandler("User already exists and pic is deleted", 400));
            }
        });
        return;
    }


    const filename= req.file.filename;
    const fileUrl= path.join(filename);

    const user= {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl
    }
    console.log(user);
    try{
        const newUser= await User.create(user);
        console.log(newUser);
        res.status(200).json({
            success: true,
            newUser
        });

        res.status(200).json(newUser);
    }catch(e){
        next(new ErrorHandler(e.message, 500));
    }

});

module.exports= router;