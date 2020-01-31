import { Module } from '@nestjs/common';

import { DatabaseModule } from './db/DatabaseModule';
import { Event } from './events/Event';
import { EventBus } from './events/EventBus';
import { EventsModule } from './events/EventsModule';

@Module({
    imports: [DatabaseModule, EventsModule],
    exports: [DatabaseModule, EventsModule],
})
export class CoreModule {}

export { Event, EventBus };
