import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';
import { sequelize, Sequelize } from '../../config/sequelize';
import Campaign from "./Campaign";
import Form from './Form'
import shortid from 'shortid'

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    defaultValue:shortid.generate(),
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Username already exists',
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg : 'Email already exists'
    }
  },
  phone: {
    type: Sequelize.STRING
  },
  is_active : {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  refresh_token: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Odds are really against you',
    },
    defaultValue: uuidv1(),
  },
});

User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    user.refresh_token = uuidv1();
});

User.beforeUpdate((user) => {
    if(user.changed('password')){
        user.password = bcrypt.hashSync(user.password,10);
        // user.refresh_token = uuidv1();
    }
});

User.prototype.comparePassword = function (somePassword) {
  return bcrypt.compareSync(somePassword, this.password);
};

// User.associate = models => {
//     models.User.hasMany(models.Campaign, {as: 'Campaigns', foreignKey: 'userId'});
// };
User.hasMany(Campaign, {as: 'campaigns',foreignKey:'userId'});
User.hasMany(Form, {as: 'forms',foreignKey:'userId'});



export default User