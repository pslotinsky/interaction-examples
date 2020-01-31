import { Module } from '@nestjs/common';

import { AccountModule } from '@account/AccountModule';
import { ConsumerModule } from '@consumer/ConsumerModule';
import { OrderModule } from '@order/OrderModule';

import { DatabaseModule } from './db/DatabaseModule';

@Module({
    imports: [
        DatabaseModule,
        AccountModule,
        ConsumerModule,
        OrderModule,
    ],
})
export class AppModule {}
