import Sequelize from 'sequelize'
import config from './env/index'

// Set up the config
const sequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password, {
  host: config.postgres.host,
  port: config.postgres.port,
  dialect: 'postgres',
  logging: false, // Disable logging
  operatorsAliases: false // Disable aliases,
});

sequelize.authenticate();

export { sequelize, Sequelize };
