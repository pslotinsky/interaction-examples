interface Params {
    readonly orderId: string;
    readonly consumerId: string;
    readonly price: number;
}

export class OrderCreatedEvent {
    public static makeId(orderId: string): string {
        return `${OrderCreatedEvent.name}_${orderId}`;
    }

    constructor(public readonly order: Params) {}

    public get id(): string {
        return OrderCreatedEvent.makeId(this.order.orderId);
    }
}
