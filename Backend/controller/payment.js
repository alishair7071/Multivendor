const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  `/process`,
  catchAsyncError(async (req, res, next) => {
    const amount = Math.round(Number(req.body.amount));

    if (!amount || amount <= 0) {
      return next(new ErrorHandler("Invalid payment amount", 400));
    }

    const myPayment = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        company: "star Solutions",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);


router.get("/stripeapikey", catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
}));

module.exports = router;
