import {Model, DataTypes} from 'sequelize'
import sequelize from '../config.connection'

class User extends Model {}

User.init({
    id:{
        autoIncrement:true,
        allowNull:false,
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    f_name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    l_name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    username:{
        allowNull:false,
        type:DataTypes.STRING,
        unique:true
    }
    
},{
    sequelize,
    modelName:'user'
})

export default User