import { Module } from '@nestjs/common';

import { DatabaseModule } from './db/DatabaseModule';

@Module({
    imports: [DatabaseModule],
    exports: [DatabaseModule],
})
export class CoreModule {}
