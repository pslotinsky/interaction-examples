export class AccountCreatedEvent {
    public static makeId(accountId: string): string {
        return `${AccountCreatedEvent.name}_${accountId}`;
    }

    constructor(public readonly accountId: string) {}

    public get id(): string {
        return AccountCreatedEvent.makeId(this.accountId);
    }
}
