import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { OrderController } from './application/OrderController';
import { OrderRepository } from './domain/OrderRepository';
import { ApproveOrderHandler } from './domain/handlers/ApproveOrderHandler';
import { RejectOrderHandler } from './domain/handlers/RejectOrderHandler';
import { CreateOrderHandler } from './domain/handlers/CreateOrderHandler';
import { CreateOrderSaga } from './domain/sagas/CreateOrderSaga';
import { GetOrdersHandler } from './infrastructure/handlers/GetOrdersHandler';
import { GetOrderHandler } from './infrastructure/handlers/GetOrderHandler';
import { OrderDbRepository } from './infrastructure/OrderDbRepository';

const commandHandlers = [CreateOrderHandler, ApproveOrderHandler, RejectOrderHandler];
const queryHandlers = [GetOrdersHandler, GetOrderHandler];
const sagas = [CreateOrderSaga];
const repositories = [{ provide: OrderRepository, useClass: OrderDbRepository }];

@Module({
    imports: [CoreModule],
    controllers: [OrderController],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...sagas,
        ...repositories,
    ],
})
export class OrderModule {}
