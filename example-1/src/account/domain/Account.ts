interface Params {
    accountId: string;
    balance?: number;
}

export class Account {
    public accountId: string;
    public balance: number;

    constructor({
        accountId,
        balance = 0,
    }: Params) {
        this.accountId = accountId;
        this.balance = balance;
    }

    public hasFunds(amount: number): boolean {
        return (this.balance >= amount);
    }

    public withdraw(amount: number): void {
        this.balance -= amount;
    }

    public replenish(amount: number): void {
        this.balance += amount;
    }
}
