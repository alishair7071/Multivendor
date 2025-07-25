const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");

//create product
router.post(
  "/create-product",
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
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

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

//get all products
router.get(
  "/get-all-products-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(e.message, 400));
    }
  })
);

//delete shop product
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      if (!productData) {
        return next(new ErrorHandler("product is not found with this id", 500));
      }

      productData.images.forEach((image) => {
        console.log(image);
      });

      productData.images.forEach((imageName) => {
        const filePath = `uploads/${imageName}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("error: " + err);
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      res.status(201).json({
        success: true,
        message: "Product deleted successfully",
        id: product._id,
      });
    } catch (error) {
      return next(new ErrorHandler(e.message, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
