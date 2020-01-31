import { Event } from '@core/CoreModule';

export class ConsumerVerifiedEvent extends Event<{
    orderId: string,
    consumerId: string,
    price: number,
}> {}
