import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';

import { CreateAccountCommand, AccountCreatedEvent } from '@account/AccountModule';
import { VerifyConsumerCommand, ConsumerVerifiedEvent, ConsumerModule } from '@consumer/ConsumerModule';
import { ConsumerRepository } from '@consumer/domain/ConsumerRepository';
import { ConsumerStatus, Consumer } from '@consumer/domain/Consumer';
import { ConsumerCreatedEvent } from '@consumer/domain/events/ConsumerCreatedEvent';
import { CreateConsumerCommand } from '@consumer/domain/commands/CreateConsumerCommand';

import { createConsumerParams, createOrderParams } from './fakeParams';
import { getPublishedEvent, getExecutedCommand, trackCommand, trackEvent } from './utils';

describe('ConsumerModule integration test', () => {
  let commandBus: CommandBus;
  let eventBus: EventBus;
  let consumerRepository: ConsumerRepository;
  let app: INestApplication;

  it('verifyConsumer', async () => {
    const consumerParams = createConsumerParams();
    await consumerRepository.save(new Consumer(consumerParams));

    const { consumerId } = consumerParams;
    const orderParams = createOrderParams({ consumerId });
    await commandBus.execute(new VerifyConsumerCommand(orderParams));

    const event = getPublishedEvent(ConsumerVerifiedEvent, consumerId);
    expect(event.order).toMatchObject(orderParams);
  });

  it('createConsumer', async () => {
    const params = createConsumerParams();
    await commandBus.execute(new CreateConsumerCommand(params));

    const consumer = await consumerRepository.findOneOrFail(params.consumerId);
    expect(consumer).toMatchObject(params);
    expect(consumer.status).toBe(ConsumerStatus.ApprovalPending);

    const event = getPublishedEvent(ConsumerCreatedEvent, params.consumerId);
    expect(event.consumerId).toBe(params.consumerId);
  });

  it('onConsumerCreated', async () => {
    const { consumerId } = createConsumerParams();
    await eventBus.publish(new ConsumerCreatedEvent(consumerId));

    const command = getExecutedCommand(CreateAccountCommand, consumerId);
    expect(command.accountId).toBe(consumerId);
  });

  it('onAccountCreated', async () => {
    const params = createConsumerParams();
    await consumerRepository.save(new Consumer(params));

    eventBus.publish(new AccountCreatedEvent(params.consumerId));

    const consumer = await consumerRepository.findOneOrFail(params.consumerId);
    expect(consumer.status).toBe(ConsumerStatus.Approved);
  });

  beforeAll(async () => {
    const imports = [ConsumerModule];
    const testingModule = await Test.createTestingModule({ imports }).compile();
    app = testingModule.createNestApplication();
    await app.init();

    commandBus = testingModule.get(CommandBus);
    trackCommand(commandBus, CreateAccountCommand);

    eventBus = testingModule.get(EventBus);
    trackEvent(eventBus, ConsumerCreatedEvent);
    trackEvent(eventBus, ConsumerVerifiedEvent);

    consumerRepository = testingModule.get(ConsumerRepository);
  });

  afterAll(async () => {
    await app.close();
  });
});
