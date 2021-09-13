const otpService = require("../Services/otpService");
const hashService = require("../Services/hashService");
const userService = require("../Services/userService");
const jwtTokenService = require("../Services/jwtTokenService");
const userDTO = require("../DTOS/userDTO");

class AuthController {
  async sendOTP(req, res) {
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone No is Required" });
    }
    const otp = await otpService.generateOtp();
    const hash = await hashService.hashOpt(`${otp}`);

    try {
      // await otpService.sendBySms(phone, otp);
      res.json({ hash, otp, phone });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Sms Sending Failed" });
    }
  }

  async verifyOtp(req, res) {
    const { hash, otp, phone } = req.body;

    if (!hash || !otp) {
      res.status(400).json({ message: "All Fields are required" });
    }

    const isValidOTP = await otpService.verifyOtp(hash, otp);

    if (!isValidOTP) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });

      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({ message: "Database Error" });
    }

    const { accessToken, refreshToken } = jwtTokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    await jwtTokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new userDTO(user);

    res.json({ auth: true, user: userDto });
  }

  async refresh(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    let user;
    try {
      user = await jwtTokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      res.status(401).json({ message: "Invalid Token" });
      return;
    }

    try {
      const token = await jwtTokenService.findRefreshToken(
        user._id,
        refreshTokenFromCookie
      );

      if (!token) {
        res.status(401).json({ message: "Invalid Token" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Error" });
      return;
    }

    const userData = await userService.findUser({ _id: user._id });

    if (!userData) {
      res.status(404).json({ message: "No user" });
      return;
    }

    const { accessToken, refreshToken } = jwtTokenService.generateTokens({
      _id: userData._id,
    });

    try {
      await jwtTokenService.updateRefreshToken(user._id, refreshToken);
    } catch (err) {
      res.status(500).json({ message: "Internal Error" });
      return;
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new userDTO(userData);

    res.json({ auth: true, user: userDto });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    await jwtTokenService.removeRefreshToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();
