import { Module } from '@nestjs/common'

/* import controller */
import { HealthController } from './health.controller'

/* import services */
import { GetService } from './get.service'

@Module({
    controllers: [HealthController],
    providers: [GetService],
})
export class HealthModule {}
