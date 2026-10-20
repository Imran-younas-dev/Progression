import './env'

/* import config */
import redis from './redis'

export default {
    connection: {
        host: redis.host,
        port: redis.port,
    },
    prefix: process.env.BULL_PREFIX || 'progression',
}
