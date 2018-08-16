import bcrypt from 'bcrypt';
import uuidv1 from 'uuid/v1';
import { sequelize, Sequelize } from '../../config/sequelize';
import Campaign from "./Campaign";
import Form from './Form'
import Area from './Area'
import Organization from './Organization'

const User = sequelize.define('user', {
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
  role: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  created_by : {
    type: Sequelize.STRING
  },
  is_active : {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  organizationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Organization,
      key: 'id'
    },
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
},{
  scopes: {
      withoutPassword: {
          attributes: { exclude: ['password'] },
      }
  }
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
User.hasMany(Area, {as: 'areas',foreignKey:'userId'});


export default User