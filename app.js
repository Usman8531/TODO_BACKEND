import { config } from "dotenv";
import express from "express";
import cors from "cors";

//  components
import todoRoutes from "./routes/todo.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
export const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(todoRoutes);
app.use("/api/v1/users", userRouter);
config({
  path: "./data/config.env",
});
