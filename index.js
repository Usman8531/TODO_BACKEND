import { app } from "./app.js";
import { connectDB } from "./data/dataBase.js";

connectDB();

app.get("/", (req, res) => {
  res.send("It's Working fine!");
});
app.listen(process.env.PORT, () => {
  console.log(
    `server is running on PORT ==> ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
// https://nodejs-todoapp-qtsf.onrender.com/