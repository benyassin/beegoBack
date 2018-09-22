import { sequelize, Sequelize} from '../../config/sequelize';
import Form from './Form';
import Collect from './Collect'

const Entity = sequelize.define('entity',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    form : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Form,
            key: 'id' 
        }
    },
    data : {
        type : Sequelize.JSON,
        allowNull: false
    },
    geometry : {
        type: Sequelize.GEOMETRY
    },
    collectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Collect,
            key: 'id'
        }
    }
})


export default Entity