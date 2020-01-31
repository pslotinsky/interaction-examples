export abstract class ConsumerService {
    public abstract async checkExistence(consumerId: string): Promise<void>;
}
