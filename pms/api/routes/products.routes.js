const express = require("express");
const { ProductsValidator } = require("../validators");
const { ProductsController } = require("../controllers");
const { Auth }  = require("../middleware")
const { Helpers } = require("../../utils");
const { multerStorageDest : { productImages } } = require("../../config")
const productImageUploader = Helpers.getMulterImageUploader(productImages);


module.exports = (app) => {
  const router = express.Router();

  router.post(
    "/",
    Auth.authenticate,
    productImageUploader.fields([
      { name: "productImage", minCount: 1, maxCount: 1 }
    ]),

    ProductsValidator.addProducts,
    ProductsController.addProducts
  );

  router.get(
    "/",
    Auth.authenticate,
    ProductsController.getProducts
  );

  router.put(
    "/",
    Auth.authenticate,
    ProductsValidator.updateProducts,
    ProductsController.updateProducts
  );

  router.get(
    "/search",
    Auth.authenticate,
    ProductsValidator.getProduct,
    ProductsController.getProduct
  );

  router.get(
    "/notifications",
    Auth.authenticate,
    ProductsController.getNotifications
  );

  app.use("/pms/products", router);
};
