export class ConsumerNotFoundError extends Error {
    constructor(consumerId: string) {
        super(`Consumer with id ${consumerId} not found`);
    }
}
