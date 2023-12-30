import DbConnect from "./configs/db/dbConnect.js";
import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoute.js";
import { notFound, errorHandler } from "./middleware/error/ErrorHandler.js";
// const CommentRoute = require("./routes/CommentRoute");
// const StoryRoute = require("./routes/StoryRoute");
const app = express();

// Db Connection
DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth routes
app.use("/api/auth/", authRoute);
// Blog routes
app.use("/api/blog/", blogRoute);
// // Comment routes
// app.use("/api/comment/", CommentRoute);
// //Story routes
// app.use("/api/story/", StoryRoute);

// Handeling Error
app.use(notFound);
app.use(errorHandler);

export default app;
