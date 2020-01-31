import { EntityManager, getManager } from 'typeorm';

import { AccountNotFoundError } from '@account/domain/errors/AccountNotFoundError';
import { AccountRepository } from '@account/domain/AccountRepository';
import { Account } from '@account/domain/Account';

import { AccountModel } from './AccountModel';
import { AccountAlreadyExistsError } from '@account/domain/errors/AccountAlreadyExistsError';

export class AccountDbRepository implements AccountRepository {
    public async findOne(
        accountId: string,
        manager: EntityManager = getManager(),
    ): Promise<Account> {
        const model = await manager.findOne(AccountModel, accountId);

        return this.createAccount(model);
    }

    public async findOneOrFail(
        accountId: string,
        manager: EntityManager = getManager(),
    ): Promise<Account> {
        const account = await this.findOne(accountId, manager);

        if (!account) {
            throw new AccountNotFoundError(accountId);
        }

        return account;
    }

    public async create(
        account: Account,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        const isExists = !!(await this.findOne(account.accountId));

        if (isExists) {
            throw new AccountAlreadyExistsError(account.accountId);
        }

        await this.save(account, manager);
    }

    public async save(
        account: Account,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        await manager.save(AccountModel, account);
    }

    private createAccount(model: AccountModel): Account {
        return model && new Account(model);
    }
}
