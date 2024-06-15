import express from 'express'
import {Sequelize} from 'sequelize'

import routes from './routes'
import models from './models'

const app = express()
const PORT = 3546 || 8254

app.use(express.json())

app.use(express({urlEncoded: true}))

app.use(routes)


const startServer = async () => {
    try{
        await sequelize.sync({force:false})
        app.listen(PORT, () => {
            console.log(`running on port ${PORT}`)
        })
    }catch(err){
        console.error({msg:'unable to connect', error:err})
    }
}

startServer()