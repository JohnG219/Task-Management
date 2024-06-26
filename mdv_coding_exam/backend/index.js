import express from "express";
import cors from "cors";
import TaskRoute from "./routes/TaskRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(TaskRoute);

app.listen(8800, ()=> console.log('Backend Connected'));