const express = require("express");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../model/product");
const router = express.Router();
const Event = require("../model/event");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

//create event product
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shop id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
      }
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

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(e.message, 400));
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
        return next(new ErrorHandler("event is not found with this id", 500));
      }

      eventData.images.forEach((imageUrl) => {
        const filePath = `uploads/${imageUrl}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const event = await Event.findByIdAndDelete(eventId);


      res.status(201).json({
        success: true,
        message: "Event deleted successfully",
        id: event._id,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
