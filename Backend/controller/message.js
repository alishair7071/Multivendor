const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Messages = require("../model/messages");
const { upload } = require("../multer");
const cloudinary = require("../cloudinary.js");

router.post(
  "/create-new-message",
  upload.single("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const messageData = {};
      console.log(req.file);
      uploadedImage = {};

      if (req.file) {
        messageData.images = req.file.filename;
      }

      const result = await cloudinary.v2.uploader.upload_stream(
        { folder: "messages_image" },
        async (error, result) => {
          if (error) return next(new ErrorHandler(error.message, 500));

          uploadedImage.public_id = result.public_id;
          uploadedImage.url = result.secure_url;
        }
      );

      // Pipe the buffer to cloudinary
      result.end(req.file.buffer);

      messageData.images = uploadedImage;
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages(messageData);

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

//get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

module.exports = router;
