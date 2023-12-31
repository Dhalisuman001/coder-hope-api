import blogRoute from "express";
import createBlogController from "../controller/blog/createBlog.js";
import saveBlogController from "../controller/blog/saveBlog.js";
import latestBlogController from "../controller/blog/latestBlog.js";
import AuthHandel from "../middleware/auth/AuthHandler.js";
import trendingBlogController from "../controller/blog/trendingBlog.js";
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
const createDraftScheme = {
  title: {
    notEmpty: { errorMessage: "Title is required" },
  },
  banner: {
    notEmpty: { errorMessage: "Banner is required" },
    matches: { options: /[://]/, errorMessage: "Banner must be a url" },
  },
};

BlogRoute.route("/create").post(
  AuthHandel,
  checkSchema(createBlogScheme),
  createBlogController
);
BlogRoute.route("/draft").post(
  AuthHandel,
  checkSchema(createDraftScheme),
  saveBlogController
);
BlogRoute.route("/latest").get(latestBlogController);
BlogRoute.route("/trending").get(trendingBlogController);

export default BlogRoute;
