const { ResponseHandler } = require("../../utils");
const { CustomersRepo } = require("../../db/repositories");

class CustomersController {
  constructor() {}

  addCustomer = async (req, res, next) => {
   
    try {

      const { first_name, last_name, email, dob, postCode, city, country, address } = req.body;

      const userId = req.user.user_id;

      const response = await CustomersRepo.addCustomer(first_name.toLowerCase(), last_name.toLowerCase(), email.toLowerCase(), dob, postCode, city, country, address, userId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.isUserAlreadyExist) {
          return ResponseHandler.errorResponse(res, 400, `Customer Already Registered With Email : ${email}`);
        } else {
          return ResponseHandler.successResponse(res, 200, {
            message: "Customer Registered successfully",
            data: response.data,
          });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  getCustomerByEmail = async (req, res, next) => {
   
    try {

      const { email } = req.query;

      const response = await CustomersRepo.getCustomerByEmail(email.toLowerCase());
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.data.length <= 0) {
          return ResponseHandler.errorResponse(res, 400, `Customer Not Found With Email: ${email}`);
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Customer Details Fetched Successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }
 
  getCustomers = async (req, res, next) => {
   
    try {

      const response = await CustomersRepo.getCustomers();
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.data.length <= 0) {
          return ResponseHandler.errorResponse(res, 400, `No Customer Found`);
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Customers Fetched Successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }
    

}

module.exports = new CustomersController();
