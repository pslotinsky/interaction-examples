import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ApproveConsumerCommand } from '../commands/ApproveConsumerCommand';
import { ConsumerRepository } from '../ConsumerRepository';

@CommandHandler(ApproveConsumerCommand)
export class ApproveConsumerHandler implements ICommandHandler<ApproveConsumerCommand> {
    @Inject() consumerRepository: ConsumerRepository;

    public async execute({ consumerId }: ApproveConsumerCommand): Promise<void> {
        const consumer = await this.consumerRepository.findOneOrFail(consumerId);
        consumer.approve();
        await this.consumerRepository.save(consumer);
    }
}
