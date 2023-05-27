import express from "express";
import {
  createTodo,
  deleteTodo,
  myTodo,
  readTodo,
  updateTodo,
} from "../controllers/todo.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTodo);

router.get("/my", isAuthenticated, myTodo);

router.get("/read", readTodo);

router.post("/update/:id", isAuthenticated, updateTodo);

router.delete("/:id", isAuthenticated, deleteTodo);
export default router;
