import express from "express";
import {
  createTodo,
  deleteTodo,
  readTodo,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/createTodo", createTodo);

router.get("/readTodos", readTodo);

router.post("/updateTodo/:id", updateTodo);

router.delete("/deleteTodo/:id", deleteTodo);
export default router;
