import {Sequilize, sequelize, Sequelize} from "../../config/sequelize";
import Campaign from "./Campaign";
import shortid from 'shortid'

const Form = sequelize.define('form',{
    id: {
        type: Sequelize.STRING,
        defaultValue:shortid.generate(),
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    color: {
      type: Sequelize.STRING
    },
    geometry : {
        type: Sequelize.STRING
    },
    isActive : {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});
Form.associate = models => {
    models.Form.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE",
    });
};
export default Form