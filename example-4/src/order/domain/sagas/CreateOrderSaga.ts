import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';
import { PaymentApprovedEvent, PaymentRejectedEvent, MakePaymentEvent } from '@account/AccountModule';
import { ConsumerVerifiedEvent, VerifyConsumerEvent } from '@consumer/ConsumerModule';

import { OrderRepository } from '../OrderRepository';
import { Order } from '../Order';

interface Params {
    orderId: string;
    consumerId: string;
    price: number;
}

@Injectable()
export class CreateOrderSaga {
    @Inject() private orderRepository: OrderRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(ConsumerVerifiedEvent, this.onConsumerVerified);
        eventBus.subscribe(PaymentApprovedEvent, this.onPaymentApproved);
        eventBus.subscribe(PaymentRejectedEvent, this.onPaymentRejected);
    }

    public async run(params: Params): Promise<void> {
        const order = new Order(params);
        await this.orderRepository.create(order);

        this.eventBus.publish(new VerifyConsumerEvent(order));
    }

    @autobind
    private async onConsumerVerified({ data }: ConsumerVerifiedEvent): Promise<void> {
        this.eventBus.publish(new MakePaymentEvent({
            accountId: data.consumerId,
            amount: data.price,
            orderId: data.orderId,
        }));
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
