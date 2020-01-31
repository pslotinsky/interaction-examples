import { Module } from '@nestjs/common';

import { OrderController } from './application/OrderController';
import { OrderService } from './domain/OrderService';
import { OrderRepository } from './domain/OrderRepository';
import { ConsumerService } from './domain/ConsumerService';
import { AccountService } from './domain/AccountService';
import { OrderDbRepository } from './infrastructure/OrderDbRepository';
import { ConsumerRpcService } from './infrastructure/ConsumerRpcService';
import { AccountRpcService } from './infrastructure/AccountRpcService';

@Module({
    controllers: [OrderController],
    providers: [
        OrderService,
        { provide: OrderRepository, useClass: OrderDbRepository },
        { provide: ConsumerService, useClass: ConsumerRpcService },
        { provide: AccountService, useClass: AccountRpcService },
    ],
})
export class OrderModule {}
