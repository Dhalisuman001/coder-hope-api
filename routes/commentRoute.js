import createCommentController from "../controller/comment/createComment.js";
import AuthHandel from "../middleware/auth/AuthHandler.js";
import { checkSchema } from "express-validator";
import commentRoute from "express";
import getCommentsController from "../controller/comment/getComments.js";

const CommentRoute = commentRoute.Router();

const createCommentScheme = {
  comment: {
    notEmpty: { errorMessage: "Comment is required" },
  },
};

CommentRoute.route("/create").post(
  AuthHandel,
  checkSchema(createCommentScheme),
  createCommentController
);
CommentRoute.route("/").get(getCommentsController);

export default CommentRoute;
