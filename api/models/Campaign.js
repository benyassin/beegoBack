import { sequelize, Sequelize } from '../../config/sequelize';

import Zone from "./Zone";
import Area from "./Area";
import Form from "./Form";
import Organization from "./Organization"


const Campaign = sequelize.define('campaign', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
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
    },
    organizationId: {
        type: Sequelize.INTEGER,
        references: {
            model: Organization,
            key: 'id'
        },
    }
});

Campaign.associate = models => {
    models.Campaign.belongsTo(models.User,{
        foreignKey: 'userId',
        onDelete: "CASCADE",
    });
};

Campaign.hasMany(Zone,{
    as:'zones',
    foreignKey:'campaignId',
    onDelete: "CASCADE",
});

Campaign.hasMany(Area,{
    as:'areas',
    foreignKey: 'campaignId',
    onDelete: "CASCADE"
});


Campaign.hasMany(Form,{
    as:'forms',
    foreignKey: 'campaignId',
    onDelete: "CASCADE"
});
//
// Campaign.belongsTo(User,{
//     foreignKey: 'userId',
//     onDelete: "CASCADE",
// });

export default Campaign