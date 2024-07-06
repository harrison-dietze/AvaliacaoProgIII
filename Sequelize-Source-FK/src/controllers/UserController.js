import User from "../models/User.js";
import * as Yup from "yup";

class UserController {

  async index(req, res) {
    let users = await User.findAll();
    return res.json(users);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { email } = req.query;

    let user = await User.findAll({
      where: { email },
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(2),
      email: Yup.string().email().required(),
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { name } = req.body;
    const { email } = req.body;
    const { username } = req.body;

    let user = await User.findAll({
      where: { name },
    });

    if (!user || user.length == 0) {
      user = await User.create({
        name,
        email,
        username
      });
    }

    return res.json(user);
  }

  async update(req, res) {
    const schemaID = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schemaID.isValid(req.params))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required().min(2),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { id } = req.params;

    const { name } = req.body;
    const { email } = req.body;

    const dados = {
      name,
      email,
    };

    await User.update(dados, {
      where: { id },
    });

    return res.send();
  }

  async destroy(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    return res.send();
  }
}

export default new UserController();