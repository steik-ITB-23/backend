const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/MongoConnect");

class Pilihan {
  constructor({ _id, userid, pilihan1, pilihan2, pilihan3, pilihan4 }) {
    Object.assign(this, {
      _id,
      userid,
      pilihan1,
      pilihan2,
      pilihan3,
      pilihan4,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("pilihan");
  }

  static async findOne({ _id, userid }) {
    try {
      const collection = await Pilihan.collection();

      if (userid) return collection.findOne({ userid });

      return collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = await Pilihan.collection();

      const pilihans = (await collection.find({}).toArray()).map((pilihan) => new Pilihan(pilihan));

      return pilihans;
    } catch (error) {
      throw error;
    }
  }

  static async create({ userid, pilihan1, pilihan2, pilihan3, pilihan4 }) {
    try {
      const collection = await Pilihan.collection();

      return await collection.insertOne({
        userid,
        pilihan1,
        pilihan2,
        pilihan3,
        pilihan4,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOneById(_id, { pilihan1, pilihan2, pilihan3, pilihan4 }) {
    try {
      const collection = await Pilihan.collection();
      return await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: {
            pilihan1,
            pilihan2,
            pilihan3,
            pilihan4,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteOneById(_id) {
    try {
      const collection = await Pilihan.collection();

      return await collection.deleteOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Pilihan;
