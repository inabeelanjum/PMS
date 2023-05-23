const { ResponseHandler } = require("../../utils");
const { UsersRepo } = require("../../db/repositories");

class UsersController {
  constructor() {}

  register = async (req, res, next) => {
   
    try {

      const { first_mame, last_mame, email, password, role_id, city, address } = req.body;

      const response = await UsersRepo.register(first_mame.toLowerCase(), last_mame.toLowerCase(), email.toLowerCase(), password, role_id, city, address);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.isUserAlreadyExist) {
          return ResponseHandler.errorResponse(res, 400, "Email Already Registered");
        } else {
          return ResponseHandler.successResponse(res, 200, {
            message: "Franchise Registered successfully",
            data: response.data,
          });
        }

    } catch (ex) {
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  login = async (req, res, next) => {
   
    try {

      const { email, password } = req.body;

      const response = await UsersRepo.login(email.toLowerCase(), password);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something Went Wrong");
        } else if (!response.isUserExist) {
          return ResponseHandler.errorResponse(res, 400, "User Not Found");
        } else if (!response.isPasswordCorrect) {
          return ResponseHandler.errorResponse(res, 400, "Incorrect Password");
        } else {
          return ResponseHandler.successResponse(res, 200, {
            message: "Success",
            data: response.data,
          });
        }

    } catch (ex) {
        return ResponseHandler.errorResponse(res, 400, "Something Went Wrong");
    }
  }
    

}

module.exports = new UsersController();
