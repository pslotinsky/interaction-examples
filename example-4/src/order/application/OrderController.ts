
import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { OrderService } from '@order/domain/OrderService';
import { Order } from '@order/domain/Order';

import { CreateOrderBody } from './requests/CreateOrderBody';
import { OrderViewModel } from './responses/OrderViewModel';

@ApiTags('order')
@Controller('order')
export class OrderController {
    @Inject() private readonly orderService: OrderService;

    @Get()
    @ApiResponse({ type: OrderViewModel, isArray: true })
    public async getList(): Promise<OrderViewModel[]> {
        const orders = await this.orderService.getList();

        return this.makeGetListResponse(orders);
    }

    @Post()
    @ApiCreatedResponse()
    public async create(
        @Body() body: CreateOrderBody,
    ): Promise<void> {
        await this.orderService.create(body);
    }

    private makeGetListResponse(orders: Order[]): OrderViewModel[] {
        return orders.map(item => ({
            ...item,
            creationTime: item.creationTime.toISOString(),
        }));
    }

}
