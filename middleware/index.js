const AuthHandel = require("./auth/AuthHandler");
const { notFound, errorHandler } = require("./error/ErrorHandler");
const { profilePhotoResize, PhotoUpload } = require("./upload/PhotoUpload");
module.exports = {
  AuthHandel,
  notFound,
  errorHandler,
  profilePhotoResize,
  PhotoUpload,
};
