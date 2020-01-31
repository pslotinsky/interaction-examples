import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';

import { CreateAccountCommand, AccountCreatedEvent, AccountModule, MakePaymentCommand, PaymentApprovedEvent, PaymentRejectedEvent } from '@account/AccountModule';
import { Account } from '@account/domain/Account';
import { AccountRepository } from '@account/domain/AccountRepository';
import { ReplenishCommand } from '@account/domain/commands/ReplenishCommand';

import { createAccountParams, createPaymentParams } from './fakeParams';
import { getPublishedEvent, getExecutedCommand, trackCommand, trackEvent } from './utils';

describe('AccountModule integration test', () => {
  let commandBus: CommandBus;
  let eventBus: EventBus;
  let accountRepository: AccountRepository;
  let app: INestApplication;

  it('createAccount', async () => {
    const { accountId } = createAccountParams();
    await commandBus.execute(new CreateAccountCommand(accountId));
    await expectBalance(accountId, 0);

    const event = getPublishedEvent(AccountCreatedEvent, accountId);
    expect(event.accountId).toBe(accountId);
  });

  it('replenish', async () => {
    const { accountId } = createAccountParams();
    await accountRepository.save(new Account({ accountId }));

    const balance = 100;
    await commandBus.execute(new ReplenishCommand(accountId, balance));
    await expectBalance(accountId, balance);
  });

  it('makePayment approved', async () => {
    const params = createPaymentParams();
    await accountRepository.save(new Account({
        accountId: params.accountId,
        balance: params.amount,
    }));
    await expectBalance(params.accountId, params.amount);

    await commandBus.execute(new MakePaymentCommand(params));
    await expectBalance(params.accountId, 0);

    const event = getPublishedEvent(PaymentApprovedEvent, params.orderId);
    expect(event.orderId).toBe(params.orderId);
  });

  it('makePayment rejected', async () => {
    const params = createPaymentParams();
    await accountRepository.save(new Account({
        accountId: params.accountId,
    }));

    await commandBus.execute(new MakePaymentCommand(params));

    const event = getPublishedEvent(PaymentRejectedEvent, params.orderId);
    expect(event.orderId).toBe(params.orderId);
  });

  beforeAll(async () => {
    const imports = [AccountModule];
    const testingModule = await Test.createTestingModule({ imports }).compile();
    app = testingModule.createNestApplication();
    await app.init();

    commandBus = testingModule.get(CommandBus);

    eventBus = testingModule.get(EventBus);
    trackEvent(eventBus, AccountCreatedEvent);
    trackEvent(eventBus, PaymentApprovedEvent);
    trackEvent(eventBus, PaymentRejectedEvent);

    accountRepository = testingModule.get(AccountRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  async function expectBalance(accountId: string, balance: number): Promise<void> {
    const account = await accountRepository.findOneOrFail(accountId);
    expect(account.balance).toBe(balance);
  }
});
