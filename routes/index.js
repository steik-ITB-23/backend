const AuthRouter = require("./AuthRouter");
const path = require("path");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Running..");
});

// Define a route to serve uploaded files
router.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../public/uploads", fileName);

  // Serve the file using sendFile
  res.sendFile(filePath);
});

router.use("/auth", AuthRouter);
// router.use("/profile", ProfileRouter);

module.exports = router;
