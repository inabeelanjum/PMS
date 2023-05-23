const joi = require("joi");
const { ResponseHandler } = require("../../utils");

/**
 * CustomersValidator
 *
 * @class CustomersValidator
 */
class CustomersValidator {
  constructor() {}

  addCustomer(req, res, next) {
    const { value, error } = joi
      .object({ 
            first_name: joi.string().max(100).required(),
            last_name: joi.string().max(100).required(),
            email: joi.string().max(100).required(),
            dob: joi.string().max(20).required(),
            postCode: joi.string().max(50).required(),
            city: joi.string().max(20).required(),
            country: joi.string().max(20).required(),
            address: joi.string().max(400).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

  getCustomerByEmail(req, res, next) {
    const { value, error } = joi
      .object({ 
            email: joi.string().max(100).required()
        })
      .validate(req.query);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }


}

module.exports = new CustomersValidator();
