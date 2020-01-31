import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';
import { ConsumerCreatedEvent, ConsumerVerifiedEvent } from '@consumer/ConsumerModule';

import { Account } from './Account';
import { AccountRepository } from './AccountRepository';
import { PaymentApprovedEvent } from './events/PaymentApprovedEvent';
import { PaymentRejectedEvent } from './events/PaymentRejectedEvent';
import { AccountCreatedEvent } from './events/AccountCreatedEvent';

interface CreateParams {
    accountId: string;
}

interface TransferParams {
    accountId: string;
    amount: number;
    orderId?: string;
}

@Injectable()
export class AccountService {
    @Inject() private accountRepository: AccountRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(ConsumerVerifiedEvent, this.onConsumerVerified);
        eventBus.subscribe(ConsumerCreatedEvent, this.onConsumerCreated);
    }

    public async create(params: CreateParams): Promise<void> {
        const account = new Account(params);
        await this.accountRepository.create(account);

        this.eventBus.publish(new AccountCreatedEvent(account));
    }

    public async pay({ orderId, accountId, amount }: TransferParams): Promise<void> {
        const account = await this.accountRepository.findOneOrFail(accountId);

        if (account.hasFunds(amount)) {
            account.withdraw(amount);
            await this.accountRepository.save(account);

            this.eventBus.publish(new PaymentApprovedEvent({ orderId }));
        } else {
            this.eventBus.publish(new PaymentRejectedEvent({ orderId }));
        }
    }

    public async replenish({ accountId, amount }: TransferParams): Promise<void> {
        const account = await this.accountRepository.findOneOrFail(accountId);

        account.replenish(amount);

        await this.accountRepository.save(account);
    }

    @autobind
    private async onConsumerCreated({ data }: ConsumerCreatedEvent): Promise<void> {
        await this.create({ accountId: data.consumerId });
    }

    @autobind
    private async onConsumerVerified({ data }: ConsumerVerifiedEvent): Promise<void> {
        await this.pay({
            accountId: data.consumerId,
            amount: data.price,
            orderId: data.orderId,
        });
    }
}
