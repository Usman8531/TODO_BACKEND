// const mongoose = require("mongoose");
import mongoose from "mongoose";
export const connectDB = () => {
  let mongo_URL = process.env.dataBase_URL;
  mongoose
    .connect(mongo_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => console.log("error in connecting dataBase =>", e));
};
