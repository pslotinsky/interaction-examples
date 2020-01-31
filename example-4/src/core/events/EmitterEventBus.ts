import { EventEmitter } from 'events';
import { Injectable } from '@nestjs/common';

import { Event, EventConstructor } from './Event';
import { EventBus, EventBusListener } from './EventBus';

@Injectable()
export class EmitterEventBus implements EventBus {
    private emitter: EventEmitter = new EventEmitter();

    public publish(event: Event) {
        this.emitter.emit(event.constructor.name, event);
    }

    public subscribe({ name }: EventConstructor, listener: EventBusListener): void {
        this.emitter.on(name, listener);
    }

    public unsubscribe({ name }: EventConstructor, listener: EventBusListener): void {
        this.emitter.off(name, listener);
    }
}
