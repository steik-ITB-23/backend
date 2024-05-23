const AuthController = require("../controllers/AuthController");
const Authentication = require("../middlewares/Authentication");

const AuthRouter = require("express").Router();

/* routes for /auth */

AuthRouter.post("/sign-in", AuthController.signIn);
AuthRouter.post("/user-info", Authentication, AuthController.userInfo);

module.exports = AuthRouter;
