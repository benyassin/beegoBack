import { sequelize, Sequelize } from '../../config/sequelize';


const organization = sequelize.define('organization',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING
    },

});

export default organization