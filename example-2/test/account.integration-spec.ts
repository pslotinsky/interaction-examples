import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AccountModule } from '@account/AccountModule';
import { AccountService } from '@account/domain/AccountService';
import { AccountRepository } from '@account/domain/AccountRepository';
import { Account } from '@account/domain/Account';

import { createAccountParams, createPaymentParams } from './fakeParams';

describe('AccountModule integration test', () => {
    let app: INestApplication;
    let accountService: AccountService;
    let accountRepository: AccountRepository;

    it('create', async () => {
        const params = createAccountParams();
        await accountService.create(params);

        const account = await accountRepository.findOne(params.accountId);
        expect(account).toMatchObject(params);
    });

    it('replenish', async () => {
        const { accountId } = createAccountParams();
        await accountService.create({ accountId });
        await expectBalance(accountId, 0);

        const amount = 100;
        await accountService.replenish({ accountId, amount });
        await expectBalance(accountId, amount);
    });

    it('pay success', async () => {
        const { accountId, amount } = createPaymentParams();
        await accountRepository.save(new Account({
            accountId,
            balance: amount,
        }));

        const success = await accountService.pay({ accountId, amount });
        expect(success).toBeTruthy();
        await expectBalance(accountId, 0);
    });

    it('pay failed', async () => {
        const { accountId, amount } = createPaymentParams();
        const balance = amount - 1;
        await accountRepository.save(new Account({ accountId, balance }));

        const success = await accountService.pay({ accountId, amount });
        expect(success).toBeFalsy();
        await expectBalance(accountId, balance);
    });

    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            imports: [AccountModule],
        }).compile();

        app = testingModule.createNestApplication();
        await app.init();

        accountService = testingModule.get(AccountService);
        accountRepository = testingModule.get(AccountRepository);
    });

    async function expectBalance(accountId: string, balance: number): Promise<void> {
        const account = await accountRepository.findOne(accountId);
        expect(account.balance).toBe(balance);
    }
});
