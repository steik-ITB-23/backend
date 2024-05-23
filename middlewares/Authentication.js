const { getPayload } = require("../helpers/jwt");
const User = require("../models/User");
const { CustomError } = require("./ErrorHandler");

const Authentication = async (req, res, next) => {
  try {
    const { token: access_token } = req.headers;
    if (!access_token) throw new CustomError(403, "Please re-login");

    const tokenIdentity = getPayload(access_token);
    if (!tokenIdentity) throw new CustomError(403, "Please re-login");

    const userIdentity = await User.findOne({ _id: tokenIdentity._id });
    if (userIdentity.microsoftId !== tokenIdentity.microsoftId) {
      throw (new CustomError(403), "Please re-login");
    }

    res.locals.user = userIdentity;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
