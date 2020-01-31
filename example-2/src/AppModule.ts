import { Module } from '@nestjs/common';

import { AccountModule } from '@account/AccountModule';
import { ConsumerModule } from '@consumer/ConsumerModule';
import { OrderModule } from '@order/OrderModule';

@Module({
    imports: [
        AccountModule,
        ConsumerModule,
        OrderModule,
    ],
})
export class AppModule {}
