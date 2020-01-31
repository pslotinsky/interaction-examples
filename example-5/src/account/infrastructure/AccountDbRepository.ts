import { EntityManager, getManager } from 'typeorm';

import { AccountNotFoundError } from '@account/domain/errors/AccountNotFoundError';
import { AccountRepository } from '@account/domain/AccountRepository';
import { Account } from '@account/domain/Account';

import { AccountModel } from './AccountModel';
import { AccountAlreadyExistsError } from '@account/domain/errors/AccountAlreadyExistsError';

export class AccountDbRepository implements AccountRepository {
    public async findOneOrFail(
        accountId: string,
        manager: EntityManager = getManager(),
    ): Promise<Account> {
        const model = await manager.findOne(AccountModel, accountId);

        if (!model) {
            throw new AccountNotFoundError(accountId);
        }

        return new Account(model);
    }

    public async create(
        account: Account,
        manager: EntityManager = getManager(),
    ): Promise<void> {
        const model = await manager.findOne(AccountModel, account.accountId);

        if (model) {
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
}
