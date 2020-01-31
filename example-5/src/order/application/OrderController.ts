
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Order } from '@order/domain/Order';
import { CreateOrderCommand } from '@order/domain/commands/CreateOrderCommand';

import { CreateOrderBody } from './requests/CreateOrderBody';
import { OrderViewModel } from './responses/OrderViewModel';
import { GetOrdersQuery } from '@order/infrastructure/queries/GetOrdersQuery';

@ApiTags('order')
@Controller('order')
export class OrderController {
    @Inject() private commandBus: CommandBus;
    @Inject() private queryBus: QueryBus;

    @Get()
    @ApiResponse({ type: OrderViewModel, isArray: true })
    public async getList(): Promise<OrderViewModel[]> {
        return this.queryBus.execute(new GetOrdersQuery());
    }

    @Post()
    @ApiCreatedResponse()
    public async create(
        @Body() body: CreateOrderBody,
    ): Promise<void> {
        await this.commandBus.execute(new CreateOrderCommand(body));
    }

}
