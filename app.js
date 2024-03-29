import DbConnect from "./configs/db/dbConnect.js";
import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoute.js";
import { notFound, errorHandler } from "./middleware/error/ErrorHandler.js";
import commonRoute from "./routes/commonRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRoute from "./routes/commentRoute.js";

const app = express();

// Db Connection
DbConnect();

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Auth routes
app.use("/api/auth/", authRoute);
// User routes
app.use("/api/user/", userRoute);
// Blog routes
app.use("/api/blog/", blogRoute);
// Common routes
app.use("/api/common/", commonRoute);
// Comment routes
app.use("/api/comment/", commentRoute);
// //Story routes
// app.use("/api/story/", StoryRoute);

// Handeling Error
app.use(notFound);
app.use(errorHandler);

export default app;
