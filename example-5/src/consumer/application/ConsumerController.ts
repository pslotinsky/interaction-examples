import { Controller, Get, Inject, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateConsumerCommand } from '@consumer/domain/commands/CreateConsumerCommand';
import { GetConsumersQuery } from '@consumer/infrastructure/queries/GetConsumersQuery';

import { CreateConsumerBody } from './requests/CreateConsumerBody';
import { ConsumerViewModel } from './responses/ConsumerViewModel';

@ApiTags('consumer')
@Controller('consumer')
export class ConsumerController {
    @Inject() commandBus: CommandBus;
    @Inject() queryBus: QueryBus;

    @Post()
    public async create(@Body() body: CreateConsumerBody): Promise<void> {
        this.commandBus.execute(new CreateConsumerCommand(body));
    }

    @Get()
    @ApiResponse({ type: ConsumerViewModel, isArray: true })
    public async getList(): Promise<ConsumerViewModel[]> {
        return this.queryBus.execute(new GetConsumersQuery());
    }
}
