import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateOrderCommand } from '../commands/CreateOrderCommand';
import { OrderRepository } from '../OrderRepository';
import { Order } from '../Order';
import { OrderCreatedEvent } from '../events/OrderCreatedEvent';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    @Inject() orderRepository: OrderRepository;
    @Inject() eventBus: EventBus;

    public async execute(event: CreateOrderCommand): Promise<void> {
        const order = new Order(event.order);
        await this.orderRepository.create(order);

        this.eventBus.publish(new OrderCreatedEvent(order));
    }
}
