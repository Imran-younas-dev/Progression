const path = require('path')

require('dotenv').config({
    path: path.resolve(__dirname, '../../../../.env'),
    quiet: true,
})

const shared = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
}

module.exports = {
    development: shared,
    test: shared,
    production: shared,
}
