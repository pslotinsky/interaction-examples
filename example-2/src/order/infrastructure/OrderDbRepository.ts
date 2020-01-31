import { getManager, EntityManager } from 'typeorm';

import { OrderRepository } from '@order/domain/OrderRepository';
import { Order } from '@order/domain/Order';
import { OrderAlreadyExistsError } from '@order/domain/errors/OrderAlreadyExistsError';

import { OrderModel } from './OrderModel';

export class OrderDbRepository implements OrderRepository {
    public async find(manager: EntityManager = getManager()): Promise<Order[]> {
        const models = await manager.find(OrderModel);

        return models.map(model => new Order(model));
    }

    public async findOne(
        orderId: string,
        manager: EntityManager = getManager(),
    ): Promise<Order | undefined> {
        const model = await manager.findOne(OrderModel, orderId);

        return model ? new Order(model) : undefined;
    }

    public async create(order: Order, manager: EntityManager = getManager()): Promise<void> {
        const model = await manager.findOne(OrderModel, order.orderId);

        if (model) {
            throw new OrderAlreadyExistsError(order.orderId);
        }

        await this.save(order, manager);
    }

    public async save(order: Order, manager: EntityManager = getManager()): Promise<void> {
        await manager.save(OrderModel, order);
    }
}
