const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

//storage
const multerStorage = multer.diskStorage({
  destination: "public/images/profile",
  filename: function (req, file, cb) {
    cb(
      null,

      (file.filename = "image" + "_" + Date.now() + file.originalname)
    );
  },
});

//file type checking
const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    // rejected file
    cb({ messsage: "Unsupported file format " }, false);
  }
};

const PhotoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

// //images resizing for profile photo
// const profilePhotoResize = async (req, res, next) => {
//   ///if there is no file
//   if (!req.file) return next();
//   req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
//   // console.log("resizing", req.file);
//   await sharp(req.file.buffer)
//     .resize(250, 250)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(path.join(`public/images/profile/${req.file.filename}`));
//   next();
// };

module.exports = {
  // profilePhotoResize,
  PhotoUpload,
};
