const JwtTokenService = require("../Services/jwtTokenService");

const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }

    const userData = await JwtTokenService.verifyToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }
};

module.exports = authMiddleware;
