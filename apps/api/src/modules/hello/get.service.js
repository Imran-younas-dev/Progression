import { Injectable } from '@nestjs/common'

/* import helpers */
import translate from '../../helpers/translate'

@Injectable()
export class GetService {
    async get() {
        return {
            message: translate('messages', 'hello'),
        }
    }
}
