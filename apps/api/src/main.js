import './config/env'
import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

/* import modules */
import { AppModule } from './app.module'

/* import models */
import sequelize from './models'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.setGlobalPrefix('api')
    app.enableCors({
        origin: 'http://localhost:5174',
    })

    const port = process.env.PORT || 6000
    await app.listen(port)

    sequelize
        .authenticate()
        .then(() => {
            Logger.log('Database connected', 'Bootstrap')
        })
        .catch((error) => {
            Logger.error(error.message, error.stack, 'Bootstrap')
        })
}

bootstrap()
