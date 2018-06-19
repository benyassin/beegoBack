import jwt from 'jsonwebtoken';
import uuidv1 from 'uuid/v1';
import config from '../../config/env';
import User from '../models/User';

const authenticate = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
      console.log(user)
    if (user && user.comparePassword(req.body.password)) {
      req.dbUser = user;
      next();
    } else {
      res.status(401).json({ error: 'Wrong username or password' });
    }
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });
};

const generateJWT = async (req, res, next) => {
  if (req.dbUser) {
    const jwtPayload = { id: req.dbUser.id,username:req.dbUser.username};
    const jwtSecret = config.jwt.jwtSecret;
    const jwtData = { expiresIn: config.jwt.jwtDuration};
    req.token = jwt.sign(jwtPayload, jwtSecret, jwtData);
    // Sets a new refresh_token every time the jwt is generated
    await req.dbUser.update({ refresh_token: uuidv1() }).catch((e) => {
      res.status(500).json({ error: e.message });
    });
  }
  next();
};

const refreshJWT = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
      refresh_token: req.body.refresh_token,
    },
  }).then((user) => {
    req.dbUser = user;
    next();
  }).catch(() => {
    res.status(401).json({ error: 'Invalid username or refresh_token' });
  });
};

const returnJWT = (req, res) => {
  if (req.dbUser && req.token) {
    res.status(201).json({ token: req.token, refresh_token: req.dbUser.refresh_token });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default {authenticate, generateJWT, refreshJWT, returnJWT};
