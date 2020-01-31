import { Injectable, Inject } from '@nestjs/common';

import { Order } from './Order';
import { OrderRepository } from './OrderRepository';
import { ConsumerService } from './ConsumerService';
import { AccountService } from './AccountService';

interface CreateParams {
    orderId: string;
    consumerId: string;
    price: number;
}

@Injectable()
export class OrderService {
    @Inject() private readonly orderRepository: OrderRepository;
    @Inject() private readonly consumerService: ConsumerService;
    @Inject() private readonly accountService: AccountService;

    public async create(params: CreateParams): Promise<void> {
        const { consumerId } = params;
        await this.consumerService.checkExistence(consumerId);

        const order = new Order(params);
        await this.orderRepository.create(order);

        await this.accountService.makePayment(consumerId, order.price)
            ? order.approvePayment()
            : order.rejectPayment();
        await this.orderRepository.save(order);
    }

    public async getList(): Promise<Order[]> {
        return this.orderRepository.find();
    }
}
