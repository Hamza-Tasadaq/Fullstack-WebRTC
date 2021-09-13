const Router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const roomsController = require("../Controllers/RoomsController");

Router.post("/api/create-room", authMiddleware, roomsController.createRooms);
Router.get("/api/get-rooms", authMiddleware, roomsController.index);

module.exports = Router;
