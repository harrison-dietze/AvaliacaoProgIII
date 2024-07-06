import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { jsonError } from "./middlewares/error.js";
import "./database/index.js";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(jsonError);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
