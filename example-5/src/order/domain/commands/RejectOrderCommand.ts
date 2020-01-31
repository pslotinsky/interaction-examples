export class RejectOrderCommand {
    public static makeId(orderId: string): string {
        return `${RejectOrderCommand.name}_${orderId}`;
    }

    constructor(public readonly orderId: string) {}

    public get id(): string {
        return RejectOrderCommand.makeId(this.orderId);
    }
}
