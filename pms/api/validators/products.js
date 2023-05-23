const Joi = require("joi");
const joi = require("joi");
const { ResponseHandler } = require("../../utils");

/**
 * ProductsValidator
 *
 * @class ProductsValidator
 */
class ProductsValidator {
  constructor() {}

  addProducts(req, res, next) {
    const { value, error } = joi
      .object({ 
            product_name: joi.string().max(30).required(),
            product_sku: joi.string().max(20).required(),
            product_quantity: joi.number().required(),
            product_unit_price: joi.string().max(5).required(),
            product_age_limit: joi.boolean().required(),
            product_description: joi.string().max(500).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

  updateProducts(req, res, next) {
    const { value, error } = joi
      .object({ 
            product_id: joi.number().required(),
            product_name: joi.string().max(30).required(),
            product_quantity: joi.number().required(),
            product_unit_price: joi.string().max(5).required(),
            product_age_limit: joi.boolean().required(),
            product_description: joi.string().max(500).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

  getProduct(req, res, next) {
    const { value, error } = joi
      .object({ 
          product_sku: joi.string().max(20).required()
        })
      .validate(req.query);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }


}

module.exports = new ProductsValidator();
