const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../model/user/UserModel");

const AuthHandel = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (!req.headers.authorization?.startsWith("Bearer"))
    throw new Error("Please provide the bearer token");
  try {
    token = req.headers.authorization.replace("Bearer ", "");
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // console.log(decoded);

      //find the user by _id
      const user = await User.findById(decoded?.id).select("-password");

      //attach the user the rerquest object
      req.user = user;
      next();
    } else {
      throw new Error("You don't have permission to access'");
    }
  } catch (error) {
    throw new Error("Token expired, login again");
  }
});

module.exports = AuthHandel;
