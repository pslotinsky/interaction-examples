import { EntityManager, getManager } from 'typeorm';

import { ConsumerRepository } from '@consumer/domain/ConsumerRepository';
import { Consumer } from '@consumer/domain/Consumer';
import { ConsumerAlreadyExistsError } from '@consumer/domain/errors/ConsumerAlreadyExistsError';
import { ConsumerNotFoundError } from '@consumer/domain/errors/ConsumerNotFoundError';

import { ConsumerModel } from './ConsumerModel';

export class ConsumerDbRepository implements ConsumerRepository {
    public async findOneOrFail(
        consumerId: string,
        manager: EntityManager = getManager(),
    ): Promise<Consumer> {
        const model = await manager.findOne(ConsumerModel, consumerId);

        if (!model) {
            throw new ConsumerNotFoundError(consumerId);
        }

        return new Consumer(model);
    }

    public async create(
        consumer: Consumer,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        const model = await manager.findOne(ConsumerModel, consumer.consumerId);

        if (model) {
            throw new ConsumerAlreadyExistsError(consumer.consumerId);
        }

        await this.save(consumer, manager);
    }

    public async save(
        consumer: Consumer,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        await manager.save(ConsumerModel, consumer);
    }
}
