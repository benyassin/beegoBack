import {Sequilize, sequelize, Sequelize} from "../../config/sequelize";



const Zone = sequelize.define('zone',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
    },
    geometry : {
        type: Sequelize.GEOMETRY
    },
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