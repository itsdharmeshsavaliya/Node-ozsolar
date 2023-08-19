import express from "express";
const app = express();
import './database';
import errorhandler from "./middleware/errorhandler";
import { APP_PORT } from "./config";
import routes from "./routes";
import path from "path";

// app.use("/api",routes);

global.appRoot = path.resolve(__dirname);

app.use("/api", routes);
app.use("/uploads", express.static('uploads'));

app.use(errorhandler);
const port = process.env.PORT || 5000;
app.listen(APP_PORT,()=>{

    console.log(`listening on port ${APP_PORT}`)
})