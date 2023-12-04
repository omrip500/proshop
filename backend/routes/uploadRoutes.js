import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // null is for error, uploads/ is the folder where we want to store the file
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // null is for error, file.fieldname is the name of the file, Date.now() is the current date and time, path.extname(file.originalname) is the extension of the file like .jpg, .png etc
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Allowed file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check extension
  const mimetype = filetypes.test(file.mimetype); // Check mimetype

  if (extname && mimetype) {
    return cb(null, true); // null is for error, true is for success
  } else {
    cb("Images only!"); // Error message
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
