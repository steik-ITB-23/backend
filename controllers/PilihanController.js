const { isStringValid } = require("../helpers/bcrypt");
const { CustomError } = require("../middlewares/ErrorHandler");
const Pilihan = require("../models/Pilihan");
const User = require("../models/User");

class PilihanController {
  static async getAll(req, res, next) {
    try {
      const pilihan = await Pilihan.findAll();
      res.status(200).json(pilihan);
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const userid = res.locals.user._id;
      const existingPilihan = await Pilihan.findOne({ userid });
      const { selections } = req.body;
      const pilihan1 = selections[0];
      const pilihan2 = selections[1];
      const pilihan3 = selections[2];
      const pilihan4 = selections[3];
      console.log({ pilihan1, pilihan2, pilihan3, pilihan4 });
      if (existingPilihan) {
        await Pilihan.updateOneById(existingPilihan._id, { pilihan1, pilihan2, pilihan3, pilihan4 });
      } else {
        await Pilihan.create({ userid, pilihan1, pilihan2, pilihan3, pilihan4 });
      }
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userid = res.locals.user._id;
      const existingPilihan = await Pilihan.findOne({ _id: id });
      if (userid !== existingPilihan.userid) {
        throw new CustomError(403, "Forbidden");
      }
      await Pilihan.deleteOneById(id);
      res.sendStatus(204); // 204 No Content is typically used for successful deletions
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PilihanController;
