const { CustomError } = require("../middlewares/ErrorHandler");
const User = require("../models/User");

class UserController {
  static async register(req, res, next) {
    try {
      const { teamName, schoolName, memberCount, members } = req.body;
      if (!teamName || !schoolName || !memberCount || !members) {
        throw new CustomError(400, "Invalid POST Request field");
      }

      await User.register({ teamName, schoolName, memberCount, members: JSON.parse(members) });

      res.status(201).json("success");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
