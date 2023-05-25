import { userModel } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setCookies } from "../utils/feature.js";

export const allUser = async (req, res) => {
  const users = await userModel.find({});

  res.json({
    success: true,
    users,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.json({
      success: false,
      message: "Invalid Email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      success: false,
      message: "Invalid Email or password",
    });
  }

  setCookies(user, res, "welcome back", 201);
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });
  setCookies(user, res, "successfully Registered", 201);
};

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Please login to get your profile",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded._id);

  res.status(200).json({
    success: true,
    user,
  });
};
