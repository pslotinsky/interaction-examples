import { Event } from '@core/CoreModule';

export class MakePaymentEvent extends Event<{
    orderId: string,
    accountId: string,
    amount: number,
}> {}
