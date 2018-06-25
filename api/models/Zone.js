import {Sequilize, sequelize, Sequelize} from "../../config/sequelize";

import shortid from 'shortid'


const Zone = sequelize.define('zone',{
    id: {
        type: Sequelize.STRING(14),
        defaultValue: shortid.generate(),
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    geometry : {
        type: Sequelize.GEOMETRY
    }
});

Zone.associate = models => {
    models.Zone.belongsTo(models.Area,{
        foreignKey: 'areaId',
        onDelete: "CASCADE",
    });
};

Zone.associate = models => {
    models.Zone.belongsTo(models.Campaign,{
        foreignKey: 'campaignId',
        onDelete: "CASCADE",
    });
};


export default Zone