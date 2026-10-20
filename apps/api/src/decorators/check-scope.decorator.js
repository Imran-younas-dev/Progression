import { SetMetadata } from '@nestjs/common'

export const CHECK_SCOPE_KEY = 'check_scope'

export const CheckScope = (scopes) => SetMetadata(CHECK_SCOPE_KEY, scopes)
