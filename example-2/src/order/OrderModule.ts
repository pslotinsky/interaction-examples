import { Module } from '@nestjs/common';

import { ConsumerModule } from '@consumer/ConsumerModule';
import { AccountModule } from '@account/AccountModule';
import { CoreModule } from '@core/CoreModule';

import { OrderController } from './application/OrderController';
import { OrderService } from './domain/OrderService';
import { OrderRepository } from './domain/OrderRepository';
import { OrderDbRepository } from './infrastructure/OrderDbRepository';

@Module({
    imports: [CoreModule, ConsumerModule, AccountModule],
    controllers: [OrderController],
    providers: [
        OrderService,
        { provide: OrderRepository, useClass: OrderDbRepository },
    ],
})
export class OrderModule {}
