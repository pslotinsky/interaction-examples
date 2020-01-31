import { Order } from './Order';

export abstract class OrderRepository {
    public abstract async find(): Promise<Order[]>;
    public abstract async findOne(orderId: string): Promise<Order | undefined>;
    public abstract async save(order: Order): Promise<void>;
    public abstract async create(order: Order): Promise<void>;
}
