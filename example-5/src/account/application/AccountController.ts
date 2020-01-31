import { Controller, Post, Inject, Body, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';

import { ReplenishCommand } from '@account/domain/commands/ReplenishCommand';

import { TransferBody } from './requests/TransferBody';

@ApiTags('account')
@Controller('account')
export class AccountController {
    @Inject() private commandBus: CommandBus;

    @Post(':accountId/replenishment')
    @ApiCreatedResponse()
    public async replenish(
        @Body() { amount }: TransferBody,
        @Param('accountId') accountId: string,
    ): Promise<void> {
        this.commandBus.execute(new ReplenishCommand(accountId, amount));
    }
}
