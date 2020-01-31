import autobind from 'autobind-decorator';
import { Injectable, Inject } from '@nestjs/common';

import { EventBus } from '@core/CoreModule';

import { Consumer } from './Consumer';
import { ConsumerRepository } from './ConsumerRepository';
import { ConsumerVerifiedEvent } from './events/ConsumerVerifiedEvent';
import { CreateConsumerSaga } from './sagas/CreateConsumerSaga';
import { VerifyConsumerEvent } from './events/VerifyConsumerEvent';

interface CreateParams {
    consumerId: string;
    name: string;
}

@Injectable()
export class ConsumerService {
    @Inject() consumerRepository: ConsumerRepository;
    @Inject() createConsumerSaga: CreateConsumerSaga;

    constructor(private eventBus: EventBus) {
        eventBus.subscribe(VerifyConsumerEvent, this.onVerifyConsumer);
    }

    public async create(params: CreateParams): Promise<void> {
        await this.createConsumerSaga.run(params);
    }

    public async getList(): Promise<Consumer[]> {
        return this.consumerRepository.find();
    }

    public async get(consumerId: string): Promise<Consumer> {
        return this.consumerRepository.findOne(consumerId);
    }

    @autobind
    private async onVerifyConsumer({ data }: VerifyConsumerEvent): Promise<void> {
        await this.consumerRepository.findOneOrFail(data.consumerId);

        this.eventBus.publish(new ConsumerVerifiedEvent(data));
    }
}
