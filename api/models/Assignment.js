import { sequelize, Sequelize } from '../../config/sequelize';



const Assignment = sequelize.define('assignment',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: Sequelize.INTEGER,
    },
    id_campaign: {
        type:Sequelize.INTEGER
    },

    id_area: {
        type:Sequelize.INTEGER
    }

});




export default Assignment