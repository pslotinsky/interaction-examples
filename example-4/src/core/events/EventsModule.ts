import { Module } from '@nestjs/common';

import { EventBus } from './EventBus';
import { EmitterEventBus } from './EmitterEventBus';

@Module({
    providers: [{ provide: EventBus, useClass: EmitterEventBus }],
    exports: [EventBus],
})
export class EventsModule {}
