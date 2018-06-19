import User from '../models/User'
import Campaign from "../models/Campaign";

const load = (req, res, next, id) => {
  User.findById(id, { attributes: { exclude: ['password', 'refresh_token'] } }).then((user) => {
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      req.dbUser = user;
      next();
    }
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
};

const get = (req, res) => {
  return res.status(200).json(req.dbUser);
};

const create = (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }, { attributes: { exclude: ['refresh_token'] } }).then((newUser) => {
    res.status(201).json(newUser);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
};

const update = (req, res) => {
  req.dbUser.update(req.body).then(() => {
    res.sendStatus(201);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
};

const list = (req, res) => {
  const { offset = 0, limit = 50 } = req.query;
  User.findAll({
    offset: offset,
    limit: limit,
    attributes: { exclude: ['password', 'refresh_token'] },
    include: [{
        model: Campaign,
        as: 'Campaigns'
    }]
  }).then((users) => {
    res.status(200).json(users);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
};

const remove = async (req, res) => {
  await req.dbUser.destroy();
  res.sendStatus(204);
};

export default {
  load, get, create, update, list, remove,
};
