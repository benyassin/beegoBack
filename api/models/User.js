import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';
import { sequelize, Sequelize } from '../../config/sequelize';
import Campaign from "./Campaign";

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
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
}, { underscored: true });

User.beforeCreate((user) => {
    user.password = bcrypt.hashSync(user.password, 10);
    user.refresh_token = uuidv1();
});

User.beforeUpdate((user) => {
    user.password = bcrypt.hashSync(user.password,10);
    user.refresh_token = uuidv1();
});

User.prototype.comparePassword = function (somePassword) {
  return bcrypt.compareSync(somePassword, this.password);
};

// User.associate = models => {
//     models.User.hasMany(models.Campaign, {as: 'Campaigns', foreignKey: 'userId'});
// };
User.hasMany(Campaign, {as: 'Campaigns',foreignKey:'userId'});


export default User