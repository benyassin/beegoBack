import { sequelize, Sequelize } from '../../config/sequelize';



const Assignment = sequelize.define('assignment',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: Sequelize.STRING,
    },
    id_campaign: {
        type:Sequelize.STRING
    },

    id_area: {
        type:Sequelize.STRING
    }

});


export default Assignment