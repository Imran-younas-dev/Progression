import { Dependencies, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { validate } from 'class-validator'

/* import decorators */
import { VALIDATE_REQUEST_KEY } from '../decorators/validate-request.decorators'

/* import helpers */
import translate from '../helpers/translate'

/* import exceptions */
import AppValidationError from '../exceptions/AppValidationError'

const SKIPPED_KEYS = ['page', 'limit', 'order', 'orderBy', 'attributes']

@Injectable()
@Dependencies(Reflector)
export class ValidateRequestGuard {
    constructor(reflector) {
        this.reflector = reflector
    }

    async canActivate(context) {
        const dtoClass = this.reflector.get(
            VALIDATE_REQUEST_KEY,
            context.getHandler()
        )

        if (!dtoClass) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const dto = new dtoClass()
        const sources = [request.params, request.query, request.body]

        sources.forEach((source) => {
            if (!source || typeof source !== 'object') {
                return
            }

            Object.keys(source).forEach((key) => {
                if (SKIPPED_KEYS.includes(key)) {
                    return
                }

                if (key in dto) {
                    dto[key] = source[key]
                }
            })
        })

        const errors = await validate(dto)

        if (errors.length) {
            const message = errors
                .flatMap((error) => Object.values(error.constraints || {}))
                .join(' ')

            throw new AppValidationError(
                message || translate('validations', 'invalid'),
                422
            )
        }

        request.body = {
            ...(request.body || {}),
            ...dto,
        }

        return true
    }
}
