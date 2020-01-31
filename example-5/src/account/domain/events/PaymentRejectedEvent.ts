export class PaymentRejectedEvent {
    public static makeId(orderId: string): string {
        return `${PaymentRejectedEvent.name}_${orderId}`;
    }

    constructor(public readonly orderId: string) {}

    public get id(): string {
        return PaymentRejectedEvent.makeId(this.orderId);
    }
}
