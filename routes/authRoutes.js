import authRoute from "express";
import registerCtrl from "../controller/auth/registerController.js";
import loginController from "../controller/auth/loginController.js";
import { checkSchema } from "express-validator";
import googleAuthController from "../controller/auth/googleAuth.js";

const AuthRoute = authRoute.Router();

const registerScheme = {
  email: {
    notEmpty: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Not a valid e-mail address" },
  },
  password: {
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "The password must be at least 6 character",
    },
  },
  fullname: {
    notEmpty: { errorMessage: "Full name is required" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Full name must be least 3 letters long",
    },
  },
};
const loginScheme = {
  email: {
    notEmpty: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Not a valid e-mail address" },
  },
  password: {
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "The password must be at least 6 character",
    },
  },
};
const googleAuthScheme = {
  access_token: {
    notEmpty: { errorMessage: "Google auth token is required" },
  },
};

AuthRoute.route("/sign-in").post(checkSchema(loginScheme), loginController);
AuthRoute.route("/sign-up").post(checkSchema(registerScheme), registerCtrl);
AuthRoute.route("/google-auth").post(
  checkSchema(googleAuthScheme),
  googleAuthController
);

export default AuthRoute;
