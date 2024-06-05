const { isStringValid } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/ErrorHandler");
const User = require("../models/User");

class UserController {
  static async update(req, res, next) {
    try {
      const { displayName, profilePicUrl } = req.body;
      const { nim } = req.params;
      const microsoftId = res.locals.user?.microsoftId;

      const existingUser = await User.findOne({ nim });
      if (!existingUser) throw new CustomError(404, "User Not Found");

      if (!isStringValid(microsoftId, existingUser.microsoftId)) throw new CustomError(403, "Unauthorized");

      await User.updateOneById(existingUser._id, { displayName, profilePicUrl });

      res.status(200).json("Updated");
    } catch (error) {
      next(error);
    }
  }

  static async getOneByNim(req, res, next) {
    try {
      const { nim } = req.params;

      const user = await User.findOne({ nim });
      if (!user) throw new CustomError(404, "User Not Found");

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
