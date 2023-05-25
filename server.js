import { app } from "./app.js";
import { connectDB } from "./data/dataBase.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log("server is running on   PORT", process.env.PORT);
});
