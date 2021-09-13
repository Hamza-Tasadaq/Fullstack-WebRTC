const crypto = require("crypto");

class HashService {
  hashOpt(data) {
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data)
      .digest("hex");
  }
}

module.exports = new HashService();
