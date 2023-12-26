const CommentLikeCtrl = require("../controller/comment/CommentLike");
const { CreateCommentCtrl } = require("../controller/comment/CreateComment");
const { DeleteCommentCtrl } = require("../controller/comment/DeleteComment");
const PostCommentsCtrl = require("../controller/comment/FetchPostComments");
const { FetchSingleCommentCtrl } = require("../controller/comment/FetchSingleComment");
const { UpdateCommentCtrl } = require("../controller/comment/UpdateComment");
const { AuthHandel } = require("../middleware");

const CommentRoute = require("express").Router();

CommentRoute.route("/create").post(AuthHandel, CreateCommentCtrl)
CommentRoute.route("/delete").put(AuthHandel, DeleteCommentCtrl)
CommentRoute.route("/update").put(AuthHandel, UpdateCommentCtrl)
CommentRoute.route("/comments/:id").get(AuthHandel, PostCommentsCtrl)
CommentRoute.route("/:id").get(AuthHandel, FetchSingleCommentCtrl)
CommentRoute.route("/like").put(AuthHandel, CommentLikeCtrl)

module.exports = CommentRoute
