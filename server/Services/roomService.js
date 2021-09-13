const RoomModel = require("../Models/roomModel");

class RoomService {
  async createRoom(payload) {
    const { roomTitle, roomType, ownerId } = payload;

    const room = await RoomModel.create({
      roomTitle,
      roomType,
      ownerId,
      speakers: [ownerId],
    });

    return room;
  }

  async getAllRooms(types) {
    const rooms = await RoomModel.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }
}

module.exports = new RoomService();
