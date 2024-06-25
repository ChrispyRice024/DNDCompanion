import {DataTypes, Model} from 'sequelize'
import sequelize from '../config/connection'

class Character extends Model{}

Character.init({
    level:{
        type:DataTypes.INTEGER,
        
    }
})