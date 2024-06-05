const PilihanController = require("../controllers/PilihanController");
const Authentication = require("../middlewares/Authentication");

const PilihanRouter = require("express").Router();

/* routes for /pilihan */

PilihanRouter.get("/", PilihanController.getAll);
PilihanRouter.post("/", Authentication, PilihanController.create);
PilihanRouter.delete("/:id", Authentication, PilihanController.delete);

module.exports = PilihanRouter;
