import { Injectable, Inject } from '@nestjs/common';

import { Order } from './Order';
import { OrderRepository } from './OrderRepository';
import { CreateOrderSaga } from './sagas/CreateOrderSaga';

interface CreateParams {
    orderId: string;
    consumerId: string;
    price: number;
}

@Injectable()
export class OrderService {
    @Inject() private orderRepository: OrderRepository;
    @Inject() private createOrderSaga: CreateOrderSaga;

    public async create(params: CreateParams): Promise<void> {
        await this.createOrderSaga.run(params);
    }

    public async getList(): Promise<Order[]> {
        return this.orderRepository.find();
    }
}
