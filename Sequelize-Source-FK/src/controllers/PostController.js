import * as Yup from "yup";
import Post from "../../src/models/Post.js";
import User from "../models/User.js";

class PostController {
  async index(req, res) {
    let posts = await Post.findAll({
      attributes:['id', 'body', 'title'],
      include: [ 
        {
            model: User,
            as: 'user',
            attributes:['name', 'email', 'username', 'id']
        }
      ] 
    });
    return res.json(posts);
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required().length(8),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { id } = req.query;

    let post = await Post.findAll({
      attributes:['id', 'body', 'title'],
      where: { id },
      include: [ 
        {
            model: User,
            as: 'user',
            attributes:['name', 'email']
        }
      ] 
    });

    return res.json(post);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      body: Yup.string().required(),
      title: Yup.string().required(),
      userId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { id } = req.body;
    const { body } = req.body;
    const { title } = req.body;
    const { userId } = req.body;

    let post = await Post.findAll({
      where: { id },
    });

    if (!post || post.length == 0) {
      post = await Post.create({
        id,
        body,
        title,
        userId,
      });
    }

    return res.json(post);
  }

  async update(req, res) {
    const schemaIdAtual = Yup.object().shape({
      pa: Yup.string().required().length(8),
    });

    if (!(await schemaIdAtual.isValid(req.params))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const schema = Yup.object().shape({
      id: Yup.string().required().length(8),
      body: Yup.string().required(),
      title: Yup.string().required(),
      userId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { pa } = req.params;

    const { id } = req.body;
    const { body } = req.body;
    const { title } = req.body;
    const { userId } = req.body;

    const dados = {
      id,
      body,
      title,
      userId,
    };

    await Post.update(dados, {
      where: { id: pa },
    });

    return res.send();
  }

  async destroy(req, res) {
    const schemaIdAtual = Yup.object().shape({
      pa: Yup.string().required().length(8),
    });

    if (!(await schemaIdAtual.isValid(req.params))) {
      return res.status(400).json({ error: "Schema is not valid." });
    }

    const { pa } = req.params;

    await Post.destroy({
      where: { id: pa },
    });

    return res.send();
  }
}

export default new PostController();
