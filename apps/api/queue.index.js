const path = require('path')

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env'),
    quiet: true,
})
require('@babel/register')
require('./src/queue')
