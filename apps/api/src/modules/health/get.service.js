import { Injectable } from '@nestjs/common'

@Injectable()
export class GetService {
    async get() {
        return {
            status: 'ok',
        }
    }
}
