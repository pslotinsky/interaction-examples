import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { RejectOrderCommand } from '../commands/RejectOrderCommand';
import { OrderRepository } from '../OrderRepository';

@CommandHandler(RejectOrderCommand)
export class RejectOrderHandler implements ICommandHandler<RejectOrderCommand> {
    @Inject() orderRepository: OrderRepository;

    public async execute({ orderId }: RejectOrderCommand): Promise<void> {
        const order = await this.orderRepository.findOneOrFail(orderId);
        order.rejectPayment();
        await this.orderRepository.save(order);
    }
}
