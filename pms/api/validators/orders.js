const joi = require("joi");
const { ResponseHandler } = require("../../utils");

/**
 * OrdersValidator
 *
 * @class OrdersValidator
 */
class OrdersValidator {
  constructor() {}

  addOrder(req, res, next) {
    const { value, error } = joi
      .object({ 
            customer_id: joi.number().required(),
            charges: joi.string().max(10).required(),
            products: joi.array().items(joi.object({
                product_id: joi.number().required(),
                quantity: joi.number().required()
            })).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

  getOrdersByCustomerId(req, res, next) {
    const { value, error } = joi
      .object({ 
            customer_id: joi.number().required()
        })
      .validate(req.query);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

}

module.exports = new OrdersValidator();
