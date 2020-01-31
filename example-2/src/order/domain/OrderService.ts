import { Injectable, Inject } from '@nestjs/common';

import { ConsumerFacade } from '@consumer/ConsumerFacade';
import { AccountFacade } from '@account/AccountFacade';

import { Order } from './Order';
import { OrderRepository } from './OrderRepository';

interface CreateParams {
    orderId: string;
    consumerId: string;
    price: number;
}

@Injectable()
export class OrderService {
    @Inject() private readonly orderRepository: OrderRepository;
    @Inject() private readonly consumerFacade: ConsumerFacade;
    @Inject() private readonly accountFacade: AccountFacade;

    public async create(params: CreateParams): Promise<void> {
        const { consumerId } = params;
        await this.consumerFacade.checkExistence(consumerId);

        const order = new Order(params);
        await this.orderRepository.create(order);

        await this.accountFacade.makePayment(consumerId, order.price)
            ? order.approvePayment()
            : order.rejectPayment();
        await this.orderRepository.save(order);
    }

    public async getList(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    public async get(orderId: string): Promise<Order | undefined> {
        return this.orderRepository.findOne(orderId);
    }
}
