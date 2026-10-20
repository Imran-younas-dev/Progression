import './config/env'
import 'reflect-metadata'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

/* import modules */
import { QueueModule } from './queues/queue.module'

async function bootstrap() {
    await NestFactory.createApplicationContext(QueueModule)
    Logger.log('Queue worker started', 'Queue')
    setInterval(() => {}, 60 * 60 * 1000)
}

bootstrap()
