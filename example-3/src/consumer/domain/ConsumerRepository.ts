import { Consumer } from './Consumer';

export abstract class ConsumerRepository {
    public abstract async save(consumer: Consumer): Promise<void>;
    public abstract async create(consumer: Consumer): Promise<void>;
    public abstract async delete(consumerId: string): Promise<void>;
    public abstract async find(): Promise<Consumer[]>;
    public abstract async findOne(consumerId: string): Promise<Consumer>;
    public abstract async findOneOrFail(consumerId: string): Promise<Consumer>;
}
