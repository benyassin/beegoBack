import {sequelize, Sequelize} from "../../config/sequelize";


import zone from './Zone'

const Area = sequelize.define('zone',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    }
});
Area.associate = models => {

    models.Area.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE",
    });

    models.Area.belongsTo(models.Campaign,{
        foreignKey: 'campaignId',
        onDelete: "CASCADE",
    });

};


Area.hasMany(zone, {as: 'zones',foreignKey:'areaId'});

export default Area