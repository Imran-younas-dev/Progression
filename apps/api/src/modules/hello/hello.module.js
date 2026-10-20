import { Module } from '@nestjs/common'

/* import controller */
import { HelloController } from './hello.controller'

/* import services */
import { GetService } from './get.service'

@Module({
    controllers: [HelloController],
    providers: [GetService],
})
export class HelloModule {}
