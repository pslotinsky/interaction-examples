import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';
import { AccountCreatedEvent } from '@account/AccountModule';
import { OrderCreatedEvent } from '@order/OrderModule';

import { Consumer } from './Consumer';
import { ConsumerRepository } from './ConsumerRepository';
import { ConsumerCreatedEvent } from './events/ConsumerCreatedEvent';
import { ConsumerVerifiedEvent } from './events/ConsumerVerifiedEvent';

interface CreateParams {
    consumerId: string;
    name: string;
}

@Injectable()
export class ConsumerService {
    @Inject() consumerRepository: ConsumerRepository;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(AccountCreatedEvent, this.onAccountCreated);
        eventBus.subscribe(OrderCreatedEvent, this.onOrderCreated);
    }

    public async create(params: CreateParams): Promise<void> {
        const consumer = new Consumer(params);
        await this.consumerRepository.create(consumer);

        this.eventBus.publish(new ConsumerCreatedEvent(consumer));
    }

    public async getList(): Promise<Consumer[]> {
        return this.consumerRepository.find();
    }

    public async get(consumerId: string): Promise<Consumer> {
        return this.consumerRepository.findOne(consumerId);
    }

    @autobind
    private async onAccountCreated({ data }: AccountCreatedEvent): Promise<void> {
        const consumer = await this.consumerRepository.findOneOrFail(data.accountId);
        consumer.approve();
        await this.consumerRepository.save(consumer);
    }

    @autobind
    private async onOrderCreated({ data }: OrderCreatedEvent): Promise<void> {
        await this.consumerRepository.findOneOrFail(data.consumerId);

        this.eventBus.publish(new ConsumerVerifiedEvent(data));
    }
}
