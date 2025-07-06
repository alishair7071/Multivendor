const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");

//create product
router.post("/create-product", upload.array("images"), catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("shop id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.originalname}`);
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            product,
          })
      }
    } catch (e) {
      return next(new ErrorHandler(e.message, 400));
    }
  })
);


module.exports= router;