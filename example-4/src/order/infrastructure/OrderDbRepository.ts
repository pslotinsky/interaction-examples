import { getManager, EntityManager } from 'typeorm';

import { OrderRepository } from '@order/domain/OrderRepository';
import { Order } from '@order/domain/Order';
import { OrderAlreadyExistsError } from '@order/domain/errors/OrderAlreadyExistsError';
import { OrderNotFoundError } from '@order/domain/errors/OrderNotFoundError';

import { OrderModel } from './OrderModel';

export class OrderDbRepository implements OrderRepository {
    public async find(manager: EntityManager = getManager()): Promise<Order[]> {
        const models = await manager.find(OrderModel);

        return models.map(model => this.createOrder(model));
    }

    public async findOne(orderId: string, manager: EntityManager = getManager()): Promise<Order> {
        const model = await manager.findOne(OrderModel, orderId);

        return this.createOrder(model);
    }

    public async findOneOrFail(orderId: string, manager: EntityManager = getManager()): Promise<Order> {
        const order = await this.findOne(orderId, manager);

        if (!order) {
            throw new OrderNotFoundError(orderId);
        }

        return order;
    }

    public async save(order: Order, manager: EntityManager = getManager()): Promise<void> {
        await manager.save(OrderModel, order);
    }

    public async create(order: Order, manager: EntityManager = getManager()): Promise<void> {
        await this.checkNonExistence(order.orderId, manager);
        await this.save(order, manager);
    }

    private createOrder(model: OrderModel): Order {
        return model && new Order(model);
    }

    private async checkNonExistence(
        orderId: string,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        const model = await manager.findOne(OrderModel, orderId);

        if (model) {
            throw new OrderAlreadyExistsError(orderId);
        }
    }
}
