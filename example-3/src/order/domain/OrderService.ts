import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';
import { PaymentApprovedEvent, PaymentRejectedEvent } from '@account/AccountModule';

import { Order } from './Order';
import { OrderRepository } from './OrderRepository';
import { OrderCreatedEvent } from './events/OrderCreatedEvent';

interface CreateParams {
    orderId: string;
    consumerId: string;
    price: number;
}

@Injectable()
export class OrderService {
    @Inject() private orderRepository: OrderRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(PaymentApprovedEvent, this.onPaymentApproved);
        eventBus.subscribe(PaymentRejectedEvent, this.onPaymentRejected);
    }

    public async create(params: CreateParams): Promise<void> {
        const order = new Order(params);
        await this.orderRepository.create(order);

        this.eventBus.publish(new OrderCreatedEvent(order));
    }

    public async getList(): Promise<Order[]> {
        return this.orderRepository.find();
    }

    @autobind
    private async onPaymentApproved({ data }: PaymentApprovedEvent): Promise<void> {
        const order = await this.orderRepository.findOneOrFail(data.orderId);
        order.approvePayment();
        await this.orderRepository.save(order);
    }

    @autobind
    private async onPaymentRejected({ data }: PaymentRejectedEvent): Promise<void> {
        const order = await this.orderRepository.findOneOrFail(data.orderId);
        order.rejectPayment();
        await this.orderRepository.save(order);
    }
}
