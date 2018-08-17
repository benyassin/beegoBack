import { sequelize, Sequelize } from "../../config/sequelize";
import Campaign from "./Campaign";

const Collect = sequelize.define('collect', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    campaignId: {
        type: Sequelize.INTEGER,
        references: {
            model : Campaign,
            key: 'id'
        }
    },
    form: {
        type: Sequelize.INTEGER,
        references: {
            model: Form,
            key: 'id'
        }
    },
    data: {
        type: Sequelize.JSON
    }
})


export default Collect