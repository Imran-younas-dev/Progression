import { Catch, HttpException, Logger } from '@nestjs/common'

/* import helpers */
import translate from '../helpers/translate'

/* import exceptions */
import AppValidationError from '../exceptions/AppValidationError'

@Catch()
export default class AllExceptionsFilter {
    constructor() {
        this.logger = new Logger(AllExceptionsFilter.name)
    }

    catch(exception, host) {
        const response = host.switchToHttp().getResponse()

        if (exception instanceof AppValidationError) {
            return response.status(exception.code || 422).json({
                message: exception.message,
            })
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const body = exception.getResponse()
            const message =
                typeof body === 'string'
                    ? body
                    : body.message || translate('errors', 'default')

            return response.status(status).json({
                message: Array.isArray(message) ? message.join(' ') : message,
            })
        }

        this.logger.error(
            exception?.message || 'Unhandled exception',
            exception?.stack
        )

        return response.status(500).json({
            message: translate('errors', 'default'),
        })
    }
}
