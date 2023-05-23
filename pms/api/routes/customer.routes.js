const express = require("express");
const { CustomersValidator } = require("../validators");
const { CustomersController } = require("../controllers");
const { Auth }  = require("../middleware")

module.exports = (app) => {
  const router = express.Router();

  router.post(
    "/",
    Auth.authenticate,
    CustomersValidator.addCustomer,
    CustomersController.addCustomer
  );

  router.get(
    "/",
    Auth.authenticate,
    CustomersController.getCustomers
  );

  router.get(
    "/find",
    Auth.authenticate,
    CustomersValidator.getCustomerByEmail,
    CustomersController.getCustomerByEmail
  );

  app.use("/pms/customers", router);
};
