import { Module } from '@nestjs/common';

import { dbProvider } from './dbProvider';

@Module({
    providers: [dbProvider],
    exports: [dbProvider],
})
export class DatabaseModule {}
