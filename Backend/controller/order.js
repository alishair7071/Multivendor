const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create-order",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      const shopItemMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemMap.has(shopId)) {
          shopItemMap.set(shopId, []);
        }

        shopItemMap.get(shopId).push(item);
      }

      
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
