import { Injectable, Inject } from '@nestjs/common';

import { Account } from './Account';
import { AccountRepository } from './AccountRepository';

interface CreateParams {
    accountId: string;
}

interface TransferParams {
    accountId: string;
    amount: number;
}

@Injectable()
export class AccountService {
    @Inject() private accountRepository: AccountRepository;

    public async create(params: CreateParams): Promise<void> {
        const account = new Account(params);

        await this.accountRepository.create(account);
    }

    public async pay({ accountId, amount }: TransferParams): Promise<boolean> {
        const account = await this.accountRepository.findOneOrFail(accountId);

        const hasFunds = account.hasFunds(amount);

        if (hasFunds) {
            account.withdraw(amount);
            await this.accountRepository.save(account);
        }

        return hasFunds;
    }

    public async replenish({ accountId, amount }: TransferParams): Promise<void> {
        const account = await this.accountRepository.findOneOrFail(accountId);

        account.replenish(amount);

        await this.accountRepository.save(account);
    }
}
