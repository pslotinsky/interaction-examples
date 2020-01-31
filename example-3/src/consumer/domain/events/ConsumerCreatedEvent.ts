import { Event } from '@core/CoreModule';

export class ConsumerCreatedEvent extends Event<{
    consumerId: string,
    name: string,
}> {}
