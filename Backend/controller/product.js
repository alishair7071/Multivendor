const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const cloudinary = require("../cloudinary.js");

//create product
router.post(
  "/create-product",
  isSeller,
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = req.seller;

      if (!shop) {
        return next(new ErrorHandler("shop id is invalid!", 400));
      }
      const productData = req.body;
      productData.shopId = shop._id;
      productData.shop = shop;

      const uploadImages= [];

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
          url: result.secure_url
        })
      }

      productData.images = uploadImages;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
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

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
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
        return next(new ErrorHandler("product is not found with this id", 404));
      }

      // make sure the product belongs to the logged-in seller
      if (productData.shopId !== req.seller._id.toString()) {
        return next(
          new ErrorHandler("You are not allowed to delete this product", 403)
        );
      }

      // remove the product images from cloudinary
      for (const image of productData.images) {
        if (image.public_id) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }

      const product = await Product.findByIdAndDelete(productId);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        id: product._id,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
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

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.body.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.body.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncError(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
