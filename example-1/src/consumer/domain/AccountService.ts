export abstract class AccountService {
    public abstract async create(accountId: string): Promise<boolean>;
}
