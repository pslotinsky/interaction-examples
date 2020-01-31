import { Account } from './Account';

export abstract class AccountRepository {
    public abstract async findOne(accountId: string): Promise<Account>;
    public abstract async findOneOrFail(accountId: string): Promise<Account>;
    public abstract async create(account: Account): Promise<void>;
    public abstract async save(account: Account): Promise<void>;
}
