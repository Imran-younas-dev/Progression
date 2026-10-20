import { Bind, Controller, Dependencies, Get, Res } from '@nestjs/common'

/* import services */
import { GetService } from './get.service'

@Controller('health')
@Dependencies()
export class HealthController {
    constructor() {
        this.getService = new GetService()
    }

    @Get()
    @Bind(Res())
    async get(response) {
        const data = await this.getService.get()
        return response.json(data)
    }
}
