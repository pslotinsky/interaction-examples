import { Event } from '@core/events/Event';

export class OrderCreatedEvent extends Event<{
    orderId: string,
    consumerId: string,
    price: number,
}> {}
