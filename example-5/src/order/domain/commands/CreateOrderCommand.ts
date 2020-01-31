interface Params {
    readonly orderId: string;
    readonly consumerId: string;
    readonly price: number;
}

export class CreateOrderCommand {
    constructor(public readonly order: Params) {}
}
