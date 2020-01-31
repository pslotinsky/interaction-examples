export class ApproveOrderCommand {
    public static makeId(orderId: string): string {
        return `${ApproveOrderCommand.name}_${orderId}`;
    }

    constructor(public readonly orderId: string) {}

    public get id(): string {
        return ApproveOrderCommand.makeId(this.orderId);
    }
}
