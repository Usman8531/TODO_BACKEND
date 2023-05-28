import { config } from "dotenv";
import express from "express";
import cors from "cors";

//  components
import todoRoutes from "./routes/todo.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
export const app = express();

// dotenv
config({
  path: "./data/config.env",
});
//using middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
console.log(process.env.FRONTEND_URL);

app.use(cookieParser());

// using routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/todo", todoRoutes);

// using error middleWare
app.use(errorMiddleWare);
