import { Injectable, Inject } from '@nestjs/common';

import { Consumer } from './Consumer';
import { ConsumerRepository } from './ConsumerRepository';
import { AccountService } from './AccountService';

interface CreateParams {
    consumerId: string;
    name: string;
}

@Injectable()
export class ConsumerService {
    @Inject() consumerRepository: ConsumerRepository;
    @Inject() accountService: AccountService;

    public async create(params: CreateParams): Promise<void> {
        const consumer = new Consumer(params);
        await this.consumerRepository.create(consumer);

        const accountCreated = await this.accountService.create(consumer.consumerId);

        if (accountCreated) {
            consumer.approve();
            await this.consumerRepository.save(consumer);
        }
    }

    public async getList(): Promise<Consumer[]> {
        return this.consumerRepository.find();
    }

    public async get(consumerId: string): Promise<Consumer> {
        return this.consumerRepository.findOne(consumerId);
    }
}
