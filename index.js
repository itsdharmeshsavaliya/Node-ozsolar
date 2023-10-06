import express from "express";
import path from "path";
import cors from 'cors';
import errorhandler from "./middleware/errorhandler";

import { connectDB } from './database';
connectDB();

import { APP_PORT } from "./config";
import routes from "./routes";

global.appRoot = path.resolve(__dirname);

const app = express();
app.use(cors());
app.use("/api", routes);
app.use("/uploads", express.static('uploads'));
app.use(errorhandler);

const port = process.env.PORT || 5000;
app.listen(APP_PORT,()=>{
    console.log(`listening on port ${APP_PORT}`)
});