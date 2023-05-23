const Joi = require("joi");
const joi = require("joi");
const { ResponseHandler } = require("../../utils");

/**
 * UsersValidator
 *
 * @class UsersValidator
 */
class UsersValidator {
  constructor() {}

  register(req, res, next) {
    const { value, error } = joi
      .object({ 
            first_mame: joi.string().max(100).required(),
            last_mame: joi.string().max(100).required(),
            email: joi.string().max(100).required(),
            password: joi.string().max(20).required(),
            role_id: joi.number().valid(2).required(),
            city: joi.string().max(20).required(),
            address: joi.string().max(400).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }

  login(req, res, next) {
    const { value, error } = joi
      .object({ 
            email: joi.string().max(100).required(),
            password: joi.string().max(20).required()
        })
      .validate(req.body);

    if (error)
      return ResponseHandler.errorResponse(res, 400, error.details[0].message);
    else {
      next();
    }
  }


}

module.exports = new UsersValidator();
