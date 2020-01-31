import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { OrderController } from './application/OrderController';
import { OrderService } from './domain/OrderService';
import { OrderRepository } from './domain/OrderRepository';
import { OrderCreatedEvent } from './domain/events/OrderCreatedEvent';
import { OrderDbRepository } from './infrastructure/OrderDbRepository';

@Module({
    imports: [CoreModule],
    controllers: [OrderController],
    providers: [
        OrderService,
        { provide: OrderRepository, useClass: OrderDbRepository },
    ],
})
export class OrderModule {}

export { OrderCreatedEvent };
