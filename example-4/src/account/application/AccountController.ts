import { Controller, Post, Inject, Body, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AccountService } from '@account/domain/AccountService';

import { TransferBody } from './requests/TransferBody';

@ApiTags('account')
@Controller('account')
export class AccountController {
    @Inject() private readonly accountService: AccountService;

    @Post(':accountId/replenishment')
    @ApiCreatedResponse()
    public async replenish(
        @Body() { amount }: TransferBody,
        @Param('accountId') accountId: string,
    ): Promise<void> {
        await this.accountService.replenish({ accountId, amount });
    }
}
