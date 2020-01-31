import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateConsumerCommand } from '../commands/CreateConsumerCommand';
import { ConsumerRepository } from '../ConsumerRepository';
import { Consumer } from '../Consumer';
import { ConsumerCreatedEvent } from '../events/ConsumerCreatedEvent';

@CommandHandler(CreateConsumerCommand)
export class CreateConsumerHandler implements ICommandHandler<CreateConsumerCommand> {
    @Inject() consumerRepository: ConsumerRepository;
    @Inject() eventBus: EventBus;

    public async execute({ data }: CreateConsumerCommand): Promise<void> {
        const consumer = new Consumer(data);
        await this.consumerRepository.create(consumer);

        this.eventBus.publish(new ConsumerCreatedEvent(consumer.consumerId));
    }
}
