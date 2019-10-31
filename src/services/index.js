const MongoConnect = require('../lib/mongo');
const DB_COLLECTION = 'reto_09';

class ProductService {
  constructor() {
    this.collection = DB_COLLECTION;
    this.mongoDB = new MongoConnect();
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection);
    return products || [];
  }
}

module.exports = ProductService;
