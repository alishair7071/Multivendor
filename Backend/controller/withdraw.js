const ErrorHandler = require("../utils/ErrorHandler");
const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Withdraw = require("../model/withdraw");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");

// create withdraw request

router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const amount = Number(req.body.amount);

      if (!amount || amount <= 0) {
        return next(new ErrorHandler("Invalid withdraw amount", 400));
      }

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 404));
      }

      if (amount > shop.availableBalance) {
        return next(
          new ErrorHandler("Insufficient balance to withdraw", 400)
        );
      }

      const data = {
        seller: req.seller,
        amount,
      };

      const withdraw = await Withdraw.create(data);

      shop.availableBalance -= amount;
      await shop.save();

      try {
        await sendMail({
          mail: req.seller.email,
          subject: "Withdraw Request Received",
          message: `Hello ${req.seller.shopName}, your withdraw request of $${amount} has been received and is being processed. it will take 3 to 7 days.`,
        });
      } catch (error) {
        console.log("enter in the send gamil catch");
        console.log(error);
        console.log("Mail not sent to user.");
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//get all withdraw requests
router.get(
  "/get-all-withdraw-requests",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update withdraw request
router.put(
  `/update-withdraw-request/:id`,
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const sellerId = req.body.sellerId;
      const status = req.body.status;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status,
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transactions.push(transaction);
      await seller.save();

      try {
        await sendMail({
          mail: seller.email,
          subject: "Withdraw Request Approved",
          message: `Hello ${seller.shopName}, your withdraw request of $${withdraw.amount} has been approved.`,
        });
      } catch (error) {
        console.log("Approval email could not be sent:", error.message);
      }

      res.status(200).json({
        success: true,
        withdraw,
      });

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
