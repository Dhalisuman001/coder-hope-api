const PostRoute = require("express").Router();

const {
  FetchPostsCtrl,
  FetchPostCtrl,
  PostCreateCtrl,
  PostLikeCtrl,
  updatePostCtrl,
  DeletePostCtrl,
} = require("../controller/post");
const FetchAllPostsCtrl = require("../controller/post/FeedPostCtrl");
const MyPostsCtrl = require("../controller/post/MyPostsCtrl");
const UserPostsCtrl = require("../controller/post/UserPostsCtrl");

const { AuthHandel } = require("../middleware");
const uploadPostPhoto = require("../middleware/upload/PostPhoto");

PostRoute.route("/create").post(AuthHandel, uploadPostPhoto, PostCreateCtrl);
PostRoute.route("/all-post").get(AuthHandel, FetchAllPostsCtrl);
PostRoute.route("/like").put(AuthHandel, PostLikeCtrl);
PostRoute.route("/").get(AuthHandel, FetchPostsCtrl);
PostRoute.route("/my-posts").get(AuthHandel, MyPostsCtrl);
PostRoute.route("/posts-of/:id").get(AuthHandel, UserPostsCtrl);
PostRoute.route("/:id").get(AuthHandel, FetchPostCtrl);
PostRoute.route("/update").put(AuthHandel, updatePostCtrl);
PostRoute.route("/delete/:id").delete(AuthHandel, DeletePostCtrl);

module.exports = PostRoute;
