import * as faker from 'faker';

interface OrderParams {
    orderId: string;
    consumerId: string;
    price: number;
}

interface ConsumerParams {
    consumerId: string;
    name: string;
}

interface AccountParams {
    accountId: string;
}

interface PaymentParams {
    orderId: string;
    accountId: string;
    amount: number;
}

export function createOrderParams(params: Partial<OrderParams> = {}): OrderParams {
    return {
        orderId: faker.random.uuid(),
        consumerId: faker.random.uuid(),
        price: 100,
        ...params,
    };
}

export function createConsumerParams(params: Partial<ConsumerParams> = {}): ConsumerParams {
    return {
        consumerId: faker.random.uuid(),
        name: faker.name.findName(),
        ...params,
    };
}

export function createAccountParams(params: Partial<AccountParams> = {}): AccountParams {
    return {
        accountId: faker.random.uuid(),
        ...params,
    };
}

export function createPaymentParams(params: Partial<PaymentParams> = {}): PaymentParams {
    return {
        accountId: faker.random.uuid(),
        orderId: faker.random.uuid(),
        amount: 100,
        ...params,
    };
}
