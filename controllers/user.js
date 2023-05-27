import { userModel } from "../models/User.js";
import bcrypt from "bcrypt";
import { setCookies } from "../utils/feature.js";

export const allUser = async (req, res) => {
  const users = await userModel.find({});

  res.json({
    success: true,
    users,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new Error("Register First"));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new Error("Invalid Email or Password"));
  }

  setCookies(user, res, "welcome back", 201);
};

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    return next(new Error("User Already Exists"));
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
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Developement" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Developement" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
