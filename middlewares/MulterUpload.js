const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { folderName } = req.params;
    cb(null, `./public/uploads/${folderName}/`);
  },
  filename: function (req, file, cb) {
    const { fileName } = req.params;
    cb(null, fileName + "-" + Date.now() + uuidv4());
  },
});

// config multer
const MulterUpload = multer({
  storage: storage,
});

module.exports = MulterUpload;
