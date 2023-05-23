const { ResponseHandler } = require("../../utils");
const { OrdersRepo } = require("../../db/repositories");

class OrdersController {
  constructor() {}

  addOrder = async (req, res, next) => {
   
    try {

      const { customer_id, charges, products } = req.body;

      const userId = req.user.user_id;

      const response = await OrdersRepo.addOrder(customer_id, charges, products, userId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (!response.isProductsExist) {
          return ResponseHandler.errorResponse(res, 400, "Products are Out of Stock");
        } else {
          return ResponseHandler.successResponse(res, 200, {
            message: "Order Placed successfully",
            data: response.data,
          });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  getOrders = async (req, res, next) => {
   
    try {

      const userId = req.user.user_id;

      const response = await OrdersRepo.getOrders(userId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else {

            return ResponseHandler.successResponse(res, 200, {
                message: "Orders Listed successfully",
                data: {
                    products_count: response.products,
                    customers_count: response.customers,
                    orders_count: response.orders.length,
                    sales: response.sales,
                    orders: response.orders
                },
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }

  getOrdersByCustomerId = async (req, res, next) => {
   
    try {

      const userId = req.user.user_id;
      const { customer_id:customerId } = req.query;

      const response = await OrdersRepo.getOrdersByCustomerId(userId, customerId);
      
        if(response.hasException) {
          return ResponseHandler.errorResponse(res, 400, "Something went wrong");
        } else if (response.data.length <= 0) {
          return ResponseHandler.errorResponse(res, 400, "No Order Found");
        } else {
            return ResponseHandler.successResponse(res, 200, {
                message: "Orders Listed successfully",
                data: response.data,
            });
        }

    } catch (ex) {
        console.log(ex)
        return ResponseHandler.errorResponse(res, 400, "Something went wrong");
    }
  }


}

module.exports = new OrdersController();
