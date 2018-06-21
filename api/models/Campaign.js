import { sequelize, Sequelize } from '../../config/sequelize';
import User from "./User";
import shortid from 'shortid'


const Campaign = sequelize.define('campaign', {
    id: {
        type: Sequelize.STRING,
        defaultValue:shortid.generate(),
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull : false
    },
    from: {
        type: Sequelize.DATE,
    },
    to: {
        type: Sequelize.DATE,
    },
    snap: {
        type: Sequelize.BOOLEAN,
    },
    tolerance_snap: {
        type: Sequelize.STRING,
    },
    overlap: {
        type: Sequelize.INTEGER,
    },
    tolerance_overlap: {
        type: Sequelize.INTEGER
    },
    is_active: {
        type: Sequelize.BOOLEAN
    }
});

Campaign.associate = models => {
    models.Campaign.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE",
    });
};

//
// Campaign.belongsTo(User,{
//     foreignKey: 'userId',
//     onDelete: "CASCADE",
// });

export default Campaign