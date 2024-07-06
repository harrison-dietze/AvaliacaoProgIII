import { Router } from "express";
import PostController from "./controllers/PostController.js";
import UserController from "./controllers/UserController.js";

const routes = new Router();

routes.get("/posts", PostController.index);
routes.get("/post", PostController.show);
routes.post("/post", PostController.store);
routes.put("/post/:id", PostController.update);
routes.delete("/post/:id", PostController.destroy);

routes.get('/users', UserController.index);
routes.get('/user', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);


routes.use("*", (req, res, next) => {
  res.json({ error: "Invalid route." });
});

export default routes;
