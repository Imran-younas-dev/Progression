import { Sequelize } from 'sequelize-typescript'

/* import config */
import database from '../config/database'

const env = process.env.NODE_ENV || 'development'
const config = database[env]

const models = []

const sequelize = new Sequelize({
    database: config.database,
    dialect: config.dialect,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    models,
    logging: false,
    dialectOptions: config.dialectOptions,
    define: config.define,
})

export { models, sequelize }
export default sequelize
