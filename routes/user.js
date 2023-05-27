import express from "express";
import {
  allUser,
  getMyProfile,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/all", allUser);

userRouter.post("/new", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logout);

userRouter.get("/me", isAuthenticated, getMyProfile);

export default userRouter;
