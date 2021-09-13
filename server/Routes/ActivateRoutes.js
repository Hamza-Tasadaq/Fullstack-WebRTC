const Router = require("express").Router();
const ActivateController = require("../Controllers/ActivateController");
const authMiddleware = require("../Middlewares/authMiddleware");

Router.post("/api/activate", authMiddleware, ActivateController.activate);

module.exports = Router;
