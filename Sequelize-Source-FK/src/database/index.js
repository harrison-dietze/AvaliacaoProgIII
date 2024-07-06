import Sequelize from "sequelize";
import databaseConfig from "../config/database.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

const models = [Post, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Faz a conexão com o BD
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
