const UserController = require("../controllers/UserController");
const Authentication = require("../middlewares/Authentication");

const UsersRouter = require("express").Router();

/* routes for /users */

UsersRouter.get("/:nim", UserController.getOneByNim);
UsersRouter.put("/:nim", Authentication, UserController.update);

module.exports = UsersRouter;
