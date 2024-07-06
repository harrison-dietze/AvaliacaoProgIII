const databaseConfig = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "json-placeholder",
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
    freezeTableName: true,
  },
};

export default databaseConfig;
