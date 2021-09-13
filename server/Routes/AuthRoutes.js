const Router = require("express").Router();
const AuthController = require("../Controllers/AuthController");

Router.post("/api/send-otp", AuthController.sendOTP);
Router.post("/api/verify-otp", AuthController.verifyOtp);
Router.get("/api/refresh", AuthController.refresh);
Router.post("/api/logout", AuthController.logout);

module.exports = Router;
