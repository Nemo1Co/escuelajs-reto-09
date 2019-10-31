const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoConnect {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoConnect.connection) {
      MongoConnect.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected successfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoConnect.connection;
  }

  getAll(collection) {
    return this.connect().then(db => {
      return db.collection(collection).find().toArray();
    });
  }
}

module.exports = MongoConnect;
