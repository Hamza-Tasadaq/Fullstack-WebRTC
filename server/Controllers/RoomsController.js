const roomService = require("../Services/roomService");
const RoomDTO = require("../DTOS/roomDTO");

class RoomsController {
  async createRooms(req, res) {
    const { roomTitle, roomType } = req.body;

    if (!roomTitle || !roomType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await roomService.createRoom({
      roomTitle,
      roomType,
      ownerId: req.user._id,
    });

    return res.json(new RoomDTO(room));
  }

  async index(req, res) {
    const rooms = await roomService.getAllRooms(["open", "social"]);
    const allRooms = rooms.map((room) => new RoomDTO(room));

    return res.json(allRooms);
  }
}

module.exports = new RoomsController();
