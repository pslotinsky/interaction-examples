import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';
import { AccountCreatedEvent, CreateAccountEvent } from '@account/AccountModule';

import { ConsumerRepository } from '../ConsumerRepository';
import { Consumer } from '../Consumer';

interface Params {
    consumerId: string;
    name: string;
}

@Injectable()
export class CreateConsumerSaga {
    @Inject() private consumerRepository: ConsumerRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(AccountCreatedEvent, this.onAccountCreated)
    }

    public async run(params: Params): Promise<void> {
        const consumer = new Consumer(params);
        await this.consumerRepository.create(consumer);

        this.eventBus.publish(new CreateAccountEvent({
            accountId: params.consumerId
        }));
    }

    @autobind
    private async onAccountCreated({ data }: AccountCreatedEvent): Promise<void> {
        const consumer = await this.consumerRepository.findOneOrFail(data.accountId);
        consumer.approve();
        await this.consumerRepository.save(consumer);
    }
}
