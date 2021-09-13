class UserDTO {
  _id;
  phone;
  activated;
  createdAt;
  name;
  avatar;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.isActivated;
    this.name = user.name ? user.name : null;
    this.avatar = user.avatar;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserDTO;
