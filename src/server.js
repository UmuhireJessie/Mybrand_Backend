import express  from "express";
import connectDB from "./database/dataconn.js";
import router from "./router/router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
connectDB;
app.use( express.json());
app.use(cors())
app.use( router );
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my API")
})
app.get("*", (req, res) => {
  res.status(404).send("Page not Found")
})


const port = process.env.PORT
app.listen(port, () => {
  console.log( `Server is running on http://localhost:${port}` );
} );