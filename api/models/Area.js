import {Sequilize, sequelize, Sequelize} from "../../config/sequelize";

import shortid from 'shortid'

import zone from './Zone'

const Area = sequelize.define('zone',{
    id: {
        type: Sequelize.STRING(14),
        defaultValue: shortid.generate(),
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
};
Area.associate = models => {
    models.Area.belongsTo(models.Campaign,{
        foreignKey: 'campaignId',
        onDelete: "CASCADE",
    });
};
Area.hasMany(zone, {as: 'zones',foreignKey:'areaId'});

export default Area