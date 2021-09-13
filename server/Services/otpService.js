const crypto = require("crypto");
const hashService = require("./hashService");
const smsSid = process.env.TWILIO_SID;
const smsAuth = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuth, { lazyLoading: true });

class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: `Your Webrtc OTP is ${otp}`,
    });
  }

  async verifyOtp(hashedOTP, otp) {
    const newOtp = await hashService.hashOpt(otp);
    return hashedOTP === newOtp;
  }
}

module.exports = new OtpService();
