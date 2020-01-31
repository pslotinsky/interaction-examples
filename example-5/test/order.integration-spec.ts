import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EventBus, CommandBus } from '@nestjs/cqrs';

import { OrderStatus, Order } from '@order/domain/Order';
import { OrderCreatedEvent } from '@order/domain/events/OrderCreatedEvent';
import { CreateOrderCommand } from '@order/domain/commands/CreateOrderCommand';
import { RejectOrderCommand } from '@order/domain/commands/RejectOrderCommand';
import { ApproveOrderCommand } from '@order/domain/commands/ApproveOrderCommand';
import { OrderRepository } from '@order/domain/OrderRepository';
import { OrderModule } from '@order/OrderModule';
import { MakePaymentCommand, PaymentApprovedEvent, PaymentRejectedEvent } from '@account/AccountModule';
import { VerifyConsumerCommand, ConsumerVerifiedEvent } from '@consumer/ConsumerModule';

import { createOrderParams } from './fakeParams';
import { trackCommand, trackEvent, getExecutedCommand, getPublishedEvent } from './utils';

describe('OrderModule integration test', () => {
  let commandBus: CommandBus;
  let eventBus: EventBus;
  let orderRepository: OrderRepository;
  let app: INestApplication;

  it('createOrder', async () => {
    const params = createOrderParams();
    await commandBus.execute(new CreateOrderCommand(params));

    const order = await orderRepository.findOneOrFail(params.orderId);
    expect(order).toMatchObject(params);
    expect(order.status).toBe(OrderStatus.ApprovalPending);

    const event = getPublishedEvent(OrderCreatedEvent, params.orderId);
    expect(event.order).toMatchObject(params);
  });

  it('onOrderCreated', async () => {
    const params = createOrderParams();
    eventBus.publish(new OrderCreatedEvent(params));

    const command = getExecutedCommand(VerifyConsumerCommand, params.orderId);
    expect(command.order).toMatchObject(params);
  });

  it('onConsumerVerified', async () => {
    const params = createOrderParams();
    eventBus.publish(new ConsumerVerifiedEvent(params));

    const { payment } = getExecutedCommand(MakePaymentCommand, params.orderId);
    expect(payment.orderId).toBe(params.orderId);
    expect(payment.accountId).toBe(params.consumerId);
    expect(payment.amount).toBe(params.price);
  });

  it('approveOrder', async () => {
    const params = createOrderParams();
    await orderRepository.save(new Order(params));

    await commandBus.execute(new ApproveOrderCommand(params.orderId));

    const order = await orderRepository.findOneOrFail(params.orderId);
    expect(order.status).toBe(OrderStatus.PaymentApproved);
  });

  it('rejectOrder', async () => {
    const params = createOrderParams();
    await orderRepository.save(new Order(params));

    await commandBus.execute(new RejectOrderCommand(params.orderId));

    const order = await orderRepository.findOneOrFail(params.orderId);
    expect(order.status).toBe(OrderStatus.PaymentRejected);
  });

  beforeAll(async () => {
    const imports = [OrderModule];
    const testingModule = await Test.createTestingModule({ imports }).compile();
    app = testingModule.createNestApplication();
    await app.init();

    commandBus = testingModule.get(CommandBus);
    trackCommand(commandBus, VerifyConsumerCommand);
    trackCommand(commandBus, MakePaymentCommand);

    eventBus = testingModule.get(EventBus);
    trackEvent(eventBus, OrderCreatedEvent);

    orderRepository = testingModule.get(OrderRepository);
  });

  afterAll(async () => {
    await app.close();
  });
});
