import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(cookieParser());

import adminRouter from "./routes/admin.js";
import userRouter from "./routes/users.js";


app.use("/admin", adminRouter);
app.use("/", userRouter);

const PORT = 4000;
mongoose
    .connect('mongodb://127.0.0.1:27017/Fullstack-Test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
