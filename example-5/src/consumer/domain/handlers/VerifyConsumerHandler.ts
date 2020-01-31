import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { VerifyConsumerCommand } from '../commands/VerifyConsumerCommand';
import { ConsumerRepository } from '../ConsumerRepository';
import { ConsumerVerifiedEvent } from '../events/ConsumerVerifiedEvent';

@CommandHandler(VerifyConsumerCommand)
export class VerifyConsumerHandler implements ICommandHandler<VerifyConsumerCommand> {
    @Inject() consumerRepository: ConsumerRepository;
    @Inject() eventBus: EventBus;

    public async execute({ order }: VerifyConsumerCommand): Promise<void> {
        await this.consumerRepository.findOneOrFail(order.consumerId);

        this.eventBus.publish(new ConsumerVerifiedEvent(order));
    }
}
