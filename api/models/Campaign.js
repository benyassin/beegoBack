import { sequelize, Sequelize } from '../../config/sequelize';
import User from "./User";


const Campaign = sequelize.define('Campaign', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull : false
    }
});
Campaign.associate = models => {
    console.log(models);
    models.Campaign.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE",
    });
};
// Campaign.belongsTo(User,{
//     foreignKey: 'userId',
//     onDelete: "CASCADE",
// });

export default Campaign