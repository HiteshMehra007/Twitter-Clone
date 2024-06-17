import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

import { v2 as cloundinary } from "cloudinary";

const app = express();

cloundinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

app.use(express.urlencoded({extended: true, limit: "16kb"}));

app.use(express.static("public"))

app.use(cookieParser());

// routes
// http://localhost:8000/api/v1/users/register

app.use("/api/v1/users", userRouter);

app.use("/api/v1/post", postRouter);


export { app };