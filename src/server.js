import express  from "express";
import connectDB from "./database/dataconn.js";
import router from "./router/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB;
app.use( express.json());
app.use( router );

const port = process.env.PORT
app.listen(port, () => {
  console.log( `Server is running on http://localhost:${port}` );
} );