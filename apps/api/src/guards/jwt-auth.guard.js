import { Dependencies, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

/* import config */
import jwtConfig from '../config/jwt'

/* import helpers */
import translate from '../helpers/translate'

/* import exceptions */
import AppValidationError from '../exceptions/AppValidationError'

@Injectable()
@Dependencies(JwtService)
export class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService
    }

    async canActivate(context) {
        const request = context.switchToHttp().getRequest()
        const header = request.headers?.authorization || ''
        const [scheme, token] = header.split(' ')

        if (scheme !== 'Bearer' || !token) {
            throw new AppValidationError(
                translate('errors', 'unauthorized'),
                401
            )
        }

        try {
            request.user = await this.jwtService.verifyAsync(token, {
                secret: jwtConfig.secret,
            })
        } catch {
            throw new AppValidationError(
                translate('errors', 'unauthorized'),
                401
            )
        }

        return true
    }
}
