export class OrderAlreadyExistsError extends Error {
    constructor(orderId: string) {
        super(`Order ${orderId} already exists`);
    }
}
