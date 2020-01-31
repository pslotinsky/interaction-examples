import { Injectable, Inject } from '@nestjs/common';

import { AccountFacade } from '@account/AccountFacade';

import { Consumer } from './Consumer';
import { ConsumerRepository } from './ConsumerRepository';

interface CreateParams {
    consumerId: string;
    name: string;
}

@Injectable()
export class ConsumerService {
    @Inject() consumerRepository: ConsumerRepository;
    @Inject() accountFacade: AccountFacade;

    public async create(params: CreateParams): Promise<void> {
        const consumer = new Consumer(params);
        await this.consumerRepository.create(consumer);

        await this.accountFacade.create(consumer.consumerId);

        consumer.approve();
        await this.consumerRepository.save(consumer);
    }

    public async getList(): Promise<Consumer[]> {
        return this.consumerRepository.find();
    }

    public async get(consumerId: string): Promise<Consumer> {
        return this.consumerRepository.findOne(consumerId);
    }

    public async checkExistence(consumerId: string): Promise<void> {
        await this.consumerRepository.findOneOrFail(consumerId);
    }
}
