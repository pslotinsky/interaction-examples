export class CreateAccountCommand {
    public static makeId(accountId: string): string {
        return `${CreateAccountCommand.name}_${accountId}`;
    }

    constructor(public readonly accountId: string) {}

    public get id(): string {
        return CreateAccountCommand.makeId(this.accountId);
    }
}
