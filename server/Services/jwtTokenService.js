const jwt = require("jsonwebtoken");
const refreshModel = require("../Models/refreshModel");

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenScret = process.env.JWT_REFRESH_TOKEN_SECRET;

class JwtTokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign(payload, refreshTokenScret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({ token, userId });
    } catch (err) {
      console.log(err);
    }
  }

  async verifyToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenScret);
  }

  async findRefreshToken(userId, refreshToken) {
    return await refreshModel.findOne({ userId: userId, token: refreshToken });
  }

  async updateRefreshToken(userId, refreshToken) {
    return await refreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  async removeRefreshToken(refreshToken) {
    return await refreshModel.updateOne({ token: refreshToken });
  }
}

module.exports = new JwtTokenService();
