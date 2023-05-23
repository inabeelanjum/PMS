const express = require("express");
const { UsersValidator } = require("../validators");
const { UsersController } = require("../controllers");

module.exports = (app) => {
  const router = express.Router();

  router.post(
    "/register",
    UsersValidator.register,
    UsersController.register
  );

  router.post(
    "/login",
    UsersValidator.login,
    UsersController.login
  );


  app.use("/pms/users", router);
};
