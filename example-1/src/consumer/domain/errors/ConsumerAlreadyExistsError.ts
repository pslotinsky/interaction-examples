export class ConsumerAlreadyExistsError extends Error {
    constructor(consumerId: string) {
        super(`Consumer with id ${consumerId} already exists`);
    }
}
