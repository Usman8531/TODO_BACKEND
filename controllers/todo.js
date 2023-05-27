import ErrorHandler from "../middlewares/error.js";
import { TodoModel } from "../models/Todos.js";

export const createTodo = async (req, res, next) => {
  const { title, location, description, createdAt } = req.body;
  // const newTodo = new TodoModel(todo);
  try {
    await TodoModel.create({
      title,
      location,
      description,
      createdAt,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
    });
  } catch (err) {
    res.json(err);
    return next(new ErrorHandler("Error While creating todo", 500));
  }
};

export const myTodo = async (req, res, next) => {
  const userID = req.user._id;
  try {
    const todo = await TodoModel.find({ user: userID });
    res.json(todo);
    next();
  } catch (err) {
    res.json(err);
    return next(err);
  }
};

export const readTodo = async (req, res, next) => {
  try {
    const todo = await TodoModel.find();
    res.send(todo);
  } catch (err) {
    return next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  const todo = req.body;
  const { _id, ...updatedTodo } = todo; // Use spread operator to remove _id property
  try {
    await TodoModel.findByIdAndUpdate(_id, updatedTodo); // Use updateOne() to update the document
    res.send(todo);
  } catch (err) {
    return next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  const _id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete(_id);
    res.send("Todo Deleted");
  } catch (err) {
    res.status(500).send("Error deleting todo");
    return next(err);
  }
};
