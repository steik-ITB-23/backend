const { ObjectId } = require("mongodb");
const { getDatabase } = require("../configs/MongoConnect");
const { getHashedString } = require("../helpers/bcrypt");

class User {
  constructor({ _id, nim, displayName, profilePicUrl, microsoftId, createdAt, lastOnline }) {
    Object.assign(this, {
      _id,
      nim,
      displayName,
      profilePicUrl,
      microsoftId,
      createdAt,
      lastOnline,
    });
  }

  static async collection() {
    return (await getDatabase()).collection("users");
  }

  static async findOne({ _id, nim }) {
    try {
      const collection = await User.collection();

      if (nim) return collection.findOne({ nim });

      return collection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const collection = await User.collection();

      const users = (
        await collection
          .find({
            projection: {
              password: 0,
            },
          })
          .toArray()
      ).map((user) => new User(user));

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async register({ nim, displayName, profilePicUrl, microsoftId }) {
    try {
      const collection = await User.collection();

      const createdAt = new Date();
      const lastOnline = new Date();

      return await collection.insertOne({
        nim,
        displayName,
        profilePicUrl,
        microsoftId: getHashedString(microsoftId),
        createdAt,
        lastOnline,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOneById(_id, { displayName, profilePicUrl }) {
    try {
      const collection = await User.collection();

      return await collection.updateOne(
        { _id: new ObjectId(_id) },
        {
          displayName,
          profilePicUrl,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
module.exports = User;
