import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';

import { Account } from './Account';
import { AccountRepository } from './AccountRepository';
import { PaymentApprovedEvent } from './events/PaymentApprovedEvent';
import { PaymentRejectedEvent } from './events/PaymentRejectedEvent';
import { CreateAccountEvent } from './events/CreateAccountEvent';
import { AccountCreatedEvent } from './events/AccountCreatedEvent';
import { MakePaymentEvent } from './events/MakePaymentEvent';

interface TransferParams {
    accountId: string;
    amount: number;
    orderId?: string;
}

@Injectable()
export class AccountService {
    @Inject() private accountRepository: AccountRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(MakePaymentEvent, this.onMakePayment);
        eventBus.subscribe(CreateAccountEvent, this.onCreateAccount);
    }

    public async replenish({ accountId, amount }: TransferParams): Promise<void> {
        const account = await this.accountRepository.findOneOrFail(accountId);

        account.replenish(amount);

        await this.accountRepository.save(account);
    }

    @autobind
    private async onCreateAccount({ data }: CreateAccountEvent): Promise<void> {
        const account = new Account(data);
        await this.accountRepository.create(account);

        this.eventBus.publish(new AccountCreatedEvent(account));
    }

    @autobind
    private async onMakePayment({ data }: MakePaymentEvent): Promise<void> {
        const { accountId, amount, orderId } = data;
        const account = await this.accountRepository.findOneOrFail(accountId);

        if (account.hasFunds(amount)) {
            account.withdraw(amount);
            await this.accountRepository.save(account);

            this.eventBus.publish(new PaymentApprovedEvent({ orderId }));
        } else {
            this.eventBus.publish(new PaymentRejectedEvent({ orderId }));
        }
    }
}
