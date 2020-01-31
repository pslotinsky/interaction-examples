interface Params {
    readonly orderId: string;
    readonly consumerId: string;
    readonly price: number;
}

export class ConsumerVerifiedEvent {
    public static makeId(consumerId: string): string {
        return `${ConsumerVerifiedEvent.name}_${consumerId}`;
    }

    constructor(public readonly order: Params) {}

    public get id(): string {
        return ConsumerVerifiedEvent.makeId(this.order.consumerId);
    }
}
