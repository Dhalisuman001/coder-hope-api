import userRoute from "express";
import fetchUserProfileController from "../controller/user/fetchProfile.js";

// const {
//   AuthHandel,
//   // PhotoUpload,
//   // profilePhotoResize,
// } = require("../middleware");

const UserRoute = userRoute.Router();

// ! ROUTES START FROM HERE

// Fetch user profile
UserRoute.route("/profile/:username").get(fetchUserProfileController);

// Fetch single user other than me
// UserRoute.route("/:id").get(AuthHandel, FetchUserCtrl);

// User update personal info
// UserRoute.route("/update").post(AuthHandel, UpdateUserCtrl);

// will be change
// UserRoute.route("/avatar-update").put(
//   AuthHandel,
//   PhotoUpload.single("image"),
//   ProfilePhotoUpdateCtrl
// );

// Admin block user
// UserRoute.route("/block/:id").put(AuthHandel, BlockUserCtrl);

// Admin unblock user
// UserRoute.route("/unblock/:id").put(AuthHandel, UnblockUserCtrl);

// Update Email
// UserRoute.route("/update-email").post(AuthHandel, UpdateEmailCtrl);

// Verify Updated Email
// UserRoute.route("/verify-newmail").put(AuthHandel, VerifyNewEmailCtrl);

// follow/unfollow another user
// UserRoute.route("/follow").post(AuthHandel, FollowingCtrl);

// Request for Changing Password
// UserRoute.route("/forget-password").post(ForgetPasswordCtrl);

// Verify Otp for changing password request
// UserRoute.route("/change-password").post(ChangePassOTP);

// Set New Password
// UserRoute.route("/new-password").post(NewPassCtrl);

// Delete user profile
// UserRoute.route("/deleteduser").put(AuthHandel, DeleteUserCtrl);

// Update Password
// UserRoute.route("/update-password").put(AuthHandel, updatePassword);

//Deactivate user profile
// UserRoute.route("/inactive").put(AuthHandel, DeactivationCtrl);

// Fetch myFollowers
// UserRoute.route("/profile/my-followers").post(AuthHandel, FetchFollowersCtrl);

// Fetch myFollowing
// UserRoute.route("/profile/my-following").post(AuthHandel, FetchFollowingCtrl);

// Fetch myFollowing
// UserRoute.route("/profile/my-post").get(AuthHandel, FetchMyPost);

export default UserRoute;
