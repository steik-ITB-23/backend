const { getToken } = require("../helpers/jwt");
const User = require("../models/User");
const { isStringValid } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/ErrorHandler");

class AuthController {
  static async signIn(req, res, next) {
    try {
      const { nim, displayName, profilePicUrl, microsoftId } = req.body;
      if (!nim || !displayName || !microsoftId) {
        throw new CustomError(400, "Invalid POST Request field");
      }

      const existingUser = await User.findOne({ nim });
      if (existingUser) {
        if (!isStringValid(microsoftId, existingUser.microsoftId)) {
          throw new CustomError(402, "Forbidden");
        }
        let displayName = existingUser.displayName;
        const _id = existingUser._id;
        res.status(200).json({ nim, displayName, profilePicUrl, _id, token: getToken(existingUser) });
      } else {
        const { insertedId } = await User.register({ nim, displayName, profilePicUrl, microsoftId });
        const newUser = await User.findOne({ _id: insertedId });
        res.status(201).json({ nim, displayName, profilePicUrl, _id: insertedId, token: getToken(newUser) });
      }
    } catch (error) {
      next(error);
    }
  }
  static async userInfo(req, res, next) {
    try {
      res.status(200).json(res.locals.user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
