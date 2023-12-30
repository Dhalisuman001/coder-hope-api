import blogRoute from "express";
import createBlogController from "../controller/blog/createBlog.js";
import AuthHandel from "../middleware/auth/AuthHandler.js";
import { checkSchema } from "express-validator";

const BlogRoute = blogRoute.Router();

const isContentEmpty = ({ blocks }) => {
  if (!blocks.length) {
    return false;
  }
  return true;
};

const createBlogScheme = {
  title: {
    notEmpty: { errorMessage: "Title is required" },
  },
  banner: {
    notEmpty: { errorMessage: "Banner is required" },
    matches: { options: /[://]/, errorMessage: "Banner must be a url" },
  },
  des: {
    notEmpty: { errorMessage: "Description is required" },
    isLength: {
      options: { max: 200 },
      errorMessage: "Description must be less than 200 character",
    },
  },
  content: {
    notEmpty: { errorMessage: "Content is required" },
    custom: {
      options: isContentEmpty,
      errorMessage: "Content is required",
    },
  },
  tags: {
    notEmpty: { errorMessage: "Tags is required" },
    isArray: {
      options: { min: 1, max: 10 },
      errorMessage: "Blog must be contain least 1 tag, Maximum 10",
    },
  },
};

BlogRoute.route("/create").post(
  AuthHandel,
  checkSchema(createBlogScheme),
  createBlogController
);
// AuthRoute.route("/sign-up").post(checkSchema(registerScheme), registerCtrl);

export default BlogRoute;
