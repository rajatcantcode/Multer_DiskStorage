const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // Destination specifies where to store the uploaded files
  destination: function (req, file, cb) {
    // Call the callback with no error and the destination directory path

    /*
     null is required to indicate there is no error.
     It follows the error-first callback pattern, signaling
     the operation was successful.
     */

    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    // A unique suffix is a string added to a filename to make it unique
    // Combining the current timestamp and a random number

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Get the file extension
    const extensionOfFile = path.extname(file.originalname);

    // Construct the new filename with the unique suffix and original extension
    cb(null, file.fieldname + "-" + uniqueSuffix + extensionOfFile);
  },
});

// Initialize multer with the custom storage engine
const upload = multer({ storage: storage });

module.exports = upload;
