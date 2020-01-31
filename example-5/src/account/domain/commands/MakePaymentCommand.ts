interface Params {
    orderId: string;
    accountId: string;
    amount: number;
}

export class MakePaymentCommand {
    public static makeId(orderId: string): string {
        return `${MakePaymentCommand.name}_${orderId}`;
    }

    constructor(public readonly payment: Params) {}

    public get id(): string {
        return MakePaymentCommand.makeId(this.payment.orderId);
    }
}
