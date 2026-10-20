import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import './config/env'

/* import modules */
import modules from './modules'

/* import config */
import jwtConfig from './config/jwt'

/* import middlewares */
import AllExceptionsFilter from './middlewares/exception-handler'

@Module({
    imports: [
        ...modules,
        JwtModule.register({
            global: true,
            secret: jwtConfig.secret,
        }),
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
