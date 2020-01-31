import { Event, EventConstructor } from './Event';

export type EventBusListener = (event: Event) => void | Promise<void>;

export abstract class EventBus {
    public abstract publish(event: Event);
    public abstract subscribe({ name }: EventConstructor, listener: EventBusListener): void;
    public abstract unsubscribe({ name }: EventConstructor, listener: EventBusListener): void;
}
