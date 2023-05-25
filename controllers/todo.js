import { TodoModel } from "../models/Todos.js";

export const createTodo = async (req, res) => {
  const todo = req.body;
    // console.log("todo", todo);
  //   res.send("Data Recieved");

  const newTodo = new TodoModel(todo);
  try {
    await newTodo.save();
    res.json(todo);
  } catch (err) {
    res.json(err);
  }
};

export const readTodo = async (req, res) => {
  const todo = await TodoModel.find();
  res.send(todo);
};

export const updateTodo = async (req, res) => {
  const todo = req.body;
  console.log(todo);
  const { _id, ...updatedTodo } = todo; // Use spread operator to remove _id property
  try {
    await TodoModel.findByIdAndUpdate(_id, updatedTodo); // Use updateOne() to update the document
    res.send(todo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating todo");
  }
};
export const deleteTodo = async (req, res) => {
  const _id = req.params.id;
  try {
    await TodoModel.findByIdAndDelete(_id);
    res.send("Todo Deleted");
  } catch (err) {
    res.status(500).send("Error deleting todo");
  }
};
