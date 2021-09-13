const Jimp = require("jimp");
const path = require("path");
const UserService = require("../Services/userService");
const userDTO = require("../DTOS/userDTO");

class ActivateController {
  async activate(req, res) {
    // Activation logic
    const { name, avatar } = req.body;
    if (!name || !avatar) {
      res.status(400).json({ message: "All fields are required!" });
      return;
    }

    // Image Base64
    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({ message: "Could not process the image" });
      return;
    }

    const userId = req.user._id;
    // Update user
    try {
      const user = await UserService.findUser({ _id: userId });
      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }
      user.isActivated = true;
      user.name = name;
      user.avatar = `storage/${imagePath}`;
      user.save();
      res.json({ user: new userDTO(user), auth: true });
      return;
    } catch (err) {
      res.status(500).json({ message: "Something went wrong!" });
      return;
    }
  }
}

module.exports = new ActivateController();
