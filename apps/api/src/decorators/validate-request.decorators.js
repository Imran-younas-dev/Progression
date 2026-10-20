import { SetMetadata } from '@nestjs/common'

export const VALIDATE_REQUEST_KEY = 'validate_request'

export const ValidateRequest = (dto) => SetMetadata(VALIDATE_REQUEST_KEY, dto)
