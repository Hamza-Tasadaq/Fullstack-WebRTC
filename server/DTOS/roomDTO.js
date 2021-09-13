class RoomDTO {
  id;
  roomTitle;
  roomType;
  speakers;
  ownerId;
  createdAt;

  constructor(room) {
    this.id = room._id;
    this.roomTitle = room.roomTitle;
    this.roomType = room.roomType;
    this.speakers = room.speakers;
    this.ownerId = room.ownerId;
    this.createdAt = room.createdAt;
  }
}

module.exports = RoomDTO;
