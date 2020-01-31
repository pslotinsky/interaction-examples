import { Event } from '@core/CoreModule';

export class VerifyConsumerEvent extends Event<{
    orderId: string,
    consumerId: string,
    price: number,
}> {}
