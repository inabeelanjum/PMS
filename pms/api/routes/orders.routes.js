const express = require("express");
const { OrdersValidator } = require("../validators");
const { OrdersController } = require("../controllers");
const { Auth }  = require("../middleware")

module.exports = (app) => {
  const router = express.Router();

  router.post(
    "/",
    Auth.authenticate,
    OrdersValidator.addOrder,
    OrdersController.addOrder
  );

  router.get(
    "/",
    Auth.authenticate,
    OrdersController.getOrders
  );

  router.get(
    "/customers",
    Auth.authenticate,
    OrdersValidator.getOrdersByCustomerId,
    OrdersController.getOrdersByCustomerId
  );

  app.use("/pms/orders", router);
};
