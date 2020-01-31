export abstract class AccountService {
    public abstract async makePayment(accountId: string, amount: number): Promise<boolean>;
}
