import { Injectable } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ConsumerVerifiedEvent, VerifyConsumerCommand } from '@consumer/ConsumerModule';
import { MakePaymentCommand, PaymentApprovedEvent, PaymentRejectedEvent } from '@account/AccountModule';

import { OrderCreatedEvent } from '../events/OrderCreatedEvent';
import { ApproveOrderCommand } from '../commands/ApproveOrderCommand';
import { RejectOrderCommand } from '../commands/RejectOrderCommand';

@Injectable()
export class CreateOrderSaga {
    @Saga()
    protected onOrderCreated(events$: Observable<any>): Observable<ICommand> {
        return events$.pipe(
            ofType(OrderCreatedEvent),
            map(({ order }) => new VerifyConsumerCommand(order)),
        );
    }

    @Saga()
    protected onConsumerVerified(events$: Observable<any>): Observable<ICommand> {
        return events$.pipe(
            ofType(ConsumerVerifiedEvent),
            map(({ order }) => new MakePaymentCommand({
                orderId: order.orderId,
                accountId: order.consumerId,
                amount: order.price,
            })),
        );
    }

    @Saga()
    protected onPaymentApproved(events$: Observable<any>): Observable<ICommand> {
        return events$.pipe(
            ofType(PaymentApprovedEvent),
            map(({ orderId }) => new ApproveOrderCommand(orderId)),
        );
    }

    @Saga()
    protected onPaymentRejected(events$: Observable<any>): Observable<ICommand> {
        return events$.pipe(
            ofType(PaymentRejectedEvent),
            map(({ orderId }) => new RejectOrderCommand(orderId)),
        );
    }
}
