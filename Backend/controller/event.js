const express = require("express");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler.js");
const Product = require("../model/product");
const router = express.Router();
const Event = require("../model/event");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const cloudinary = require("../cloudinary.js");

//create event product
router.post(
  "/create-event",
  isSeller,
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = req.seller;
      if (!shop) {
        return next(new ErrorHandler("shop id is invalid!", 400));
      }

      const eventData = req.body;
      eventData.shopId = shop._id;
      eventData.shop = shop;

      const uploadImages = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            {
              folder: "products_images",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.end(file.buffer);
        });

        uploadImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      eventData.images = uploadImages;

      const product = await Event.create(eventData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (e) {
      return next(new ErrorHandler(e.message, 400));
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

//get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(200).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//delete shop event
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;

      const eventData = await Event.findById(eventId);

      if (!eventData) {
        return next(new ErrorHandler("event is not found with this id", 404));
      }

      // make sure the event belongs to the logged-in seller
      if (eventData.shopId !== req.seller._id.toString()) {
        return next(
          new ErrorHandler("You are not allowed to delete this event", 403)
        );
      }

      // remove the event images from cloudinary
      for (const image of eventData.images) {
        if (image.public_id) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }

      const event = await Event.findByIdAndDelete(eventId);

      res.status(200).json({
        success: true,
        message: "Event deleted successfully",
        id: event._id,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
