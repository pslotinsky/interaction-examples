import { EntityManager, getManager } from 'typeorm';

import { ConsumerRepository } from '@consumer/domain/ConsumerRepository';
import { Consumer } from '@consumer/domain/Consumer';
import { ConsumerAlreadyExistsError } from '@consumer/domain/errors/ConsumerAlreadyExistsError';
import { ConsumerNotFoundError } from '@consumer/domain/errors/ConsumerNotFoundError';

import { ConsumerModel } from './ConsumerModel';

export class ConsumerDbRepository implements ConsumerRepository {
    public async findOne(
        consumerId: string,
        manager: EntityManager = getManager(),
    ): Promise<Consumer> {
        const model = await manager.findOne(ConsumerModel, consumerId);

        return this.createConsumer(model);
    }

    public async findOneOrFail(
        consumerId: string,
        manager: EntityManager = getManager(),
    ): Promise<Consumer> {
        const consumer = await manager.findOne(ConsumerModel, consumerId);

        if (!consumer) {
            throw new ConsumerNotFoundError(consumerId);
        }

        return this.findOne(consumerId);
    }

    public async find(
        manager: EntityManager = getManager(),
    ): Promise<Consumer[]> {
        const models = await manager.find(ConsumerModel);

        return models.map(model => this.createConsumer(model));
    }

    public async delete(
        consumerId: string,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        await this.findOneOrFail(consumerId, manager);

        await manager.delete(ConsumerModel, consumerId);
    }

    public async create(
        consumer: Consumer,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        await this.checkNonExistence(consumer.consumerId);
        await this.save(consumer, manager);
    }

    public async save(
        consumer: Consumer,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        await manager.save(ConsumerModel, consumer);
    }

    private createConsumer(model: ConsumerModel): Consumer {
        return model && new Consumer(model);
    }

    private async checkNonExistence(
        consumerId: string,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        const model = await manager.findOne(ConsumerModel, consumerId);

        if (model) {
            throw new ConsumerAlreadyExistsError(consumerId);
        }
    }
}
