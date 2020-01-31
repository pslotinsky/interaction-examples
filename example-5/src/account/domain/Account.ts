import { AggregateRoot } from '@nestjs/cqrs';

import { PaymentApprovedEvent } from './events/PaymentApprovedEvent';
import { PaymentRejectedEvent } from './events/PaymentRejectedEvent';

interface Params {
    accountId: string;
    balance?: number;
}

export class Account extends AggregateRoot {
    public accountId: string;
    public balance: number;

    constructor({
        accountId,
        balance = 0,
    }: Params) {
        super();

        this.accountId = accountId;
        this.balance = balance;
    }

    public pay(orderId: string, amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;

            this.apply(new PaymentApprovedEvent(orderId));
        } else {
            this.apply(new PaymentRejectedEvent(orderId));
        }
    }

    public replenish(amount: number): void {
        this.balance += amount;
    }
}
