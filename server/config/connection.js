import Sequelize from 'sequelize'
import dotenv from 'dotenv'

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:'localhost',
        dialect:'mysql',
        port:3306
    },
    {operatorsAliases:false}
)

export default sequelize