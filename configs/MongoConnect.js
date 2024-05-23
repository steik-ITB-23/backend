const { MongoClient } = require("mongodb");

const connectionString = process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017";

let db = null;

const MongoConnect = async () => {
  console.log("🛢️  MONGODB | connecting to", connectionString);
  const client = new MongoClient(connectionString);
  try {
    await client.connect();
    const database = client.db("Steik2023");
    db = database;
    console.log("🛢️  MONGODB | connected to MongoDB");

    return database;
  } catch (err) {
    console.error(err);
    await client.close();
    return null;
  }
};

const getDatabase = () => db;

module.exports = { MongoConnect, getDatabase };
