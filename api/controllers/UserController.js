import User from '../models/User'

const load = (req, res, next, id) => {

  User.findById(id, { attributes: { exclude: ['password', 'refresh_token'] } }).then((user) => {
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      req.user = user;
      next();
    }
  }).catch((e) => {

    res.status(500).json({ error: e.message });

  });

};

const get = (req, res) => {

  return res.status(200).json(req.user);

};

const create = (req, res) => {

  User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    organizationId: req.user.organization,
    createdBy: req.user.id
  }).then((newUser) => {
      newUser.password = undefined;
      res.status(201).json(newUser);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });

};


const update = (req, res) => {

  User.update(req.body,{where:{id:req.params.userId}}).then(() => {
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
  }).then((users) => {
    res.status(200).json(users);
  }).catch((e) => {
    res.status(500).json({ error: e.message });
  });

};

const remove = async (req, res) => {
  await req.user.destroy();
  res.sendStatus(204);
};

const assignToOrganization = (user,organization) => {

      User.findById(user).then((user) => {
          user.organizationId = organization;
          user.role = 'OWNER';
          user.save();
          return {error:false, message:'Assigned to Organization'}
      }).catch((e) =>{
          return {error:true, message:e.message}
      })
};


export default {
    load,
    get,
    create,
    update,
    list,
    remove,
    assignToOrganization
};
