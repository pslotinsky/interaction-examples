import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from './db/DatabaseModule';

@Module({
    imports: [DatabaseModule, CqrsModule],
    exports: [DatabaseModule, CqrsModule],
})
export class CoreModule {}
