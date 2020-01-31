export class ReplenishCommand {
    constructor(
        public readonly accountId: string,
        public readonly amount: number,
    ) {}
}
