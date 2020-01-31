interface Params {
    readonly orderId: string;
    readonly consumerId: string;
    readonly price: number;
}

export class VerifyConsumerCommand {
    public static makeId(orderId: string): string {
        return `${VerifyConsumerCommand.name}_${orderId}`;
    }

    constructor(public readonly order: Params) {}

    get id(): string {
        return VerifyConsumerCommand.makeId(this.order.orderId);
    }
}
