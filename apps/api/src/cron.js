import './config/env'
import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

/* import modules */
import { CronModule } from './crons/cron.module'

async function bootstrap() {
    await NestFactory.createApplicationContext(CronModule)
    Logger.log('Cron process started', 'Cron')
    setInterval(() => {}, 60 * 60 * 1000)
}

bootstrap()
