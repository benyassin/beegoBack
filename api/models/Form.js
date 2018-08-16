import {sequelize, Sequelize} from "../../config/sequelize";
import Organization from "./Organization"


const Form = sequelize.define('form',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING
    },
    geometry: {
        type: Sequelize.STRING
    },
    schema: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    organizationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Organization,
            key: 'id'
        },
    }
});

Form.associate = models => {
    models.Form.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE"
    });

};

Form.associate = models => {
    models.Form.belongsTo(models.Campaign,{
        foreignKey: 'campaignId',
        onDelete: "CASCADE"
    })
};

export default Form