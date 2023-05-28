import { app } from "./app.js";
import { connectDB } from "./data/dataBase.js";
import cors from "cors";
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL, // Set the environment variable for the allowed origin
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("It's Working fine!");
});
//

app.listen(process.env.PORT, () => {
  console.log(
    `server is running on PORT ==> ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
// https://nodejs-todoapp-qtsf.onrender.com/
