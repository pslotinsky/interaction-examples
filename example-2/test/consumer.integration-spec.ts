import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AccountFacade } from '@account/AccountFacade';
import { ConsumerModule } from '@consumer/ConsumerModule';
import { ConsumerService } from '@consumer/domain/ConsumerService';
import { ConsumerNotFoundError } from '@consumer/domain/errors/ConsumerNotFoundError';
import { ConsumerStatus } from '@consumer/domain/Consumer';

import { createConsumerParams } from './fakeParams';

describe('ConsumerModule integration test', () => {
  let app: INestApplication;
  let consumerService: ConsumerService;
  let accountFacade: AccountFacade;

  it('createConsumer', async () => {
    jest.spyOn(accountFacade, 'create').mockImplementationOnce(async () => null);

    const params = createConsumerParams();
    await consumerService.create(params);

    const consumer = await consumerService.get(params.consumerId);
    expect(consumer).toMatchObject(params);
    expect(consumer.status).toBe(ConsumerStatus.Approved);
  });

  it('checkExistence Exists', async () => {
    jest.spyOn(accountFacade, 'create').mockImplementationOnce(async () => null);

    const params = createConsumerParams();
    await consumerService.create(params);

    await consumerService.checkExistence(params.consumerId);
  });

  it('checkExistence NotExists', async () => {
    expect.assertions(1);

    const { consumerId } = createConsumerParams();
    await consumerService.checkExistence(consumerId).catch(error => {
        expect(error).toBeInstanceOf(ConsumerNotFoundError);
    });
  });

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [ConsumerModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    consumerService = testingModule.get(ConsumerService);
    accountFacade = testingModule.get(AccountFacade);
  });
});
