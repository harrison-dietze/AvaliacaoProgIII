const Sequelize = require("sequelize");

const connection = new Sequelize('postgres://postgres:root@localhost:5432/json-placeholder')

connection
  .authenticate()
  .then(() => {
    console.log("OK.");
  })
  .catch((err) => {
    console.err(err);
  });
