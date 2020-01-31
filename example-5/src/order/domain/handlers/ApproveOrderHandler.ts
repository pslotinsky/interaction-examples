import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ApproveOrderCommand } from '../commands/ApproveOrderCommand';
import { OrderRepository } from '../OrderRepository';

@CommandHandler(ApproveOrderCommand)
export class ApproveOrderHandler implements ICommandHandler<ApproveOrderCommand> {
    @Inject() orderRepository: OrderRepository;

    public async execute({ orderId }: ApproveOrderCommand): Promise<void> {
        const order = await this.orderRepository.findOneOrFail(orderId);
        order.approvePayment();
        await this.orderRepository.save(order);
    }
}
