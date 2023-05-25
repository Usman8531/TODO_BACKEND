import express from "express";
import {
  allUser,
  getMyProfile,
  loginUser,
  registerUser,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/all", allUser);

userRouter.post("/new", registerUser);

userRouter.post("/login", loginUser);

// userRouter.route("/userId/:id").get(getUserDetails);

userRouter.get("/me", getMyProfile);

export default userRouter;
