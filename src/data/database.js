const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.warn("Trying to init DB again!");
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDataBase = () => {
  if (!database) {
    throw new Error("DB not initialized!");
  }
  return database;
};

module.exports = { initDb, getDataBase };