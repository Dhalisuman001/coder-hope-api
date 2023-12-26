const multer = require('multer');
const path = require("path");

const StoryPhoto = multer({
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../public/images/story"));
        },
        filename: (req, file, cb) => {
            cb(
                null,
                (file.filename =
                    file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0])
            );
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg") {
            cb(null, true); // accept only image files
        } else {
            cb(null, false);
            const err = new Error("Only .jpg .jpeg .png images are supported!");
            err.name = "ExtensionError";
            return cb(err);
        }
    }
});

module.exports = StoryPhoto;
