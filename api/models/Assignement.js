import { sequelize, Sequelize } from '../../config/sequelize';
import shortid from 'shortid';



const Assignement = sequelize.define('assignment',{
    id: {
        type: Sequelize.STRING,
        defaultValue: shortid.generate(),
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


export default Assignement