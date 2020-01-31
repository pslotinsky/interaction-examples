import { Controller, Post, Inject, Body, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AccountService } from '@account/domain/AccountService';

import { CreateBody } from './requests/CreateBody';
import { TransferBody } from './requests/TransferBody';
import { PayViewModel } from './responses/PayViewModel';

@ApiTags('account')
@Controller('account')
export class AccountController {
    @Inject() private readonly accountService: AccountService;

    @Post()
    @ApiCreatedResponse()
    public async create(@Body() body: CreateBody): Promise<void> {
        await this.accountService.create(body);
    }

    @Post(':accountId/payment')
    @ApiCreatedResponse({ type: PayViewModel })
    public async pay(
        @Body() { amount }: TransferBody,
        @Param('accountId') accountId: string,
    ): Promise<PayViewModel> {
        const isSuccessful = await this.accountService.pay({ accountId, amount });
        return { isSuccessful };
    }

    @Post(':accountId/replenishment')
    @ApiCreatedResponse()
    public async replenish(
        @Body() { amount }: TransferBody,
        @Param('accountId') accountId: string,
    ): Promise<void> {
        await this.accountService.replenish({ accountId, amount });
    }
}
