const AuthRouter = require("./AuthRouter");
const UploadsRouter = require("./UploadsRouter");
const UsersRouter = require("./UsersRouter");
const PilihanRouter = require("./PilihanRouter");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Running..");
});

router.use("/uploads", UploadsRouter);
router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);
router.use("/pilihan", PilihanRouter);

// router.use("/profile", ProfileRouter);

module.exports = router;
