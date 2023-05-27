import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "Please login to get your profile",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(decoded._id);

  next();
};
