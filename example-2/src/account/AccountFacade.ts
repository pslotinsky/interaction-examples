import { Inject, Injectable } from '@nestjs/common';

import { AccountService } from './domain/AccountService';

@Injectable()
export class AccountFacade {
    @Inject() accountService: AccountService;

    public async makePayment(accountId: string, amount: number): Promise<boolean> {
        return this.accountService.pay({ accountId, amount });
    }

    public async create(accountId: string): Promise<void> {
        this.accountService.create({ accountId });
    }
}
