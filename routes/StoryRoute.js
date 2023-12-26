const StoryRoute = require("express").Router();
const StoryCreateCtrl = require("../controller/story/CreateStory");
const StoryPhoto = require("../middleware/upload/StoryPhoto");
const { AuthHandel, PhotoUpload } = require("../middleware");
const FetchStoriesCtrl = require("../controller/story/FetchStories");
const FetchStoryCtrl = require("../controller/story/FetchStory");
const DeleteStoryCtrl = require("../controller/story/DeleteStory");
const StoryLikeCtrl = require("../controller/story/StoryLike");

StoryRoute.route("/create").post(AuthHandel, StoryPhoto.single('image'), StoryCreateCtrl);
StoryRoute.route("/").get(AuthHandel, FetchStoriesCtrl);
StoryRoute.route("/:id").get(AuthHandel, FetchStoryCtrl);
StoryRoute.route("/like").put(AuthHandel, StoryLikeCtrl);
StoryRoute.route("/delete").delete(AuthHandel, DeleteStoryCtrl);

module.exports = StoryRoute;