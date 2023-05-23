const { ResponseHandler } = require("../../utils");
const { ProductsRepo } = require("../../db/repositories");

class ProductsController {
  constructor() {}

  addProducts = async (req, res, next) => {
   
    try {

      const { product_name, product_sku, product_quantity, product_unit_price, product_age_limit, product_description } = req.body;

      const userId = req.user.user_id;

      const productImageUrl = req.files.productImage[0].filename;

      const response = await ProductsRepo.addProducts(product_name.toLowerCase(), product_sku.toUpperCase(), product_quantity, product_unit_price, product_age_limit, product_description, userId, productImageUrl);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.isProductAlreadyExist) {
          return ResponseHandler.errorResponse(res, 400, `Product with SKU:${product_sku} Already Exist`);
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Product Added successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  getProducts = async (req, res, next) => {
   
    try {

      const userId = req.user.user_id;

      const response = await ProductsRepo.getProducts(userId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.data.length <= 0) {
          return ResponseHandler.errorResponse(res, 400, "No Product Found");
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Product Listed successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  updateProducts = async (req, res, next) => {
   
    try {

      const { product_id, product_name, product_quantity, product_unit_price, product_age_limit, product_description } = req.body;

      const response = await ProductsRepo.updateProducts(product_id, product_name.toLowerCase(), product_quantity, product_unit_price, product_age_limit, product_description);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (!response.isProductExist) {
          return ResponseHandler.errorResponse(res, 400, `Product Not Found with Product ID : ${product_id}`);
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Product Updated successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }
 
  getProduct = async (req, res, next) => {
   
    try {

      const { product_sku } = req.query;

      const response = await ProductsRepo.getProduct(product_sku.toUpperCase());
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.data.length <= 0) {
          return ResponseHandler.errorResponse(res, 400, "Product Not Found");
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Product Listed successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  getNotifications = async (req, res, next) => {
   
    try {

      const userId = req.user.user_id;

      const response = await ProductsRepo.getNotifications(userId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Notifications",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

}

module.exports = new ProductsController();
