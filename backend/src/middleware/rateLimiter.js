import { ratelimit } from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-ip");
    if (!success) {
      return res.status(429).json({
        success: false,
        message:
          "زۆرترین داواکاری گەیشتە سەرحد، تکایە دووبارە هەوڵبدەرەوە پاش کەمێک کات",
      });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({
      success: false,
      message: "هەڵەیەک ڕویدا لە کاتی پڕۆسەی سنووردارکردن",
      error: error.message,
    });
  }
};
