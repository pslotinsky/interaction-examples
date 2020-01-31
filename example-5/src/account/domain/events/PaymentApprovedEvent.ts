export class PaymentApprovedEvent {
    public static makeId(orderId: string): string {
        return `${PaymentApprovedEvent.name}_${orderId}`;
    }

    constructor(public readonly orderId: string) {}

    public get id(): string {
        return PaymentApprovedEvent.makeId(this.orderId);
    }
}
