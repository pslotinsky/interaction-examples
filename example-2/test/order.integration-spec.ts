import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { OrderModule } from '@order/OrderModule';
import { OrderService } from '@order/domain/OrderService';
import { OrderStatus } from '@order/domain/Order';
import { AccountFacade } from '@account/AccountFacade';
import { ConsumerFacade } from '@consumer/ConsumerFacade';

import { createOrderParams } from './fakeParams';

describe('OrderModule integration test', () => {
  let app: INestApplication;
  let orderService: OrderService;
  let consumerFacade: ConsumerFacade;
  let accountFacade: AccountFacade;

  it('createOrder PaymentApproved ', async () => {
    jest.spyOn(consumerFacade, 'checkExistence').mockImplementation(async () => null);
    jest.spyOn(accountFacade, 'makePayment').mockImplementation(async () => true);

    const params = createOrderParams();
    await orderService.create(params);

    const order = await orderService.get(params.orderId);
    expect(order.status).toBe(OrderStatus.PaymentApproved);
  });

  it('createOrder PaymentRejected ', async () => {
    jest.spyOn(consumerFacade, 'checkExistence').mockImplementation(async () => null);
    jest.spyOn(accountFacade, 'makePayment').mockImplementation(async () => false);

    const params = createOrderParams();
    await orderService.create(params);

    const order = await orderService.get(params.orderId);
    expect(order.status).toBe(OrderStatus.PaymentRejected);
  });

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    app = testingModule.createNestApplication();
    await app.init();

    orderService = testingModule.get(OrderService);
    consumerFacade = testingModule.get(ConsumerFacade);
    accountFacade = testingModule.get(AccountFacade);
  });
});
