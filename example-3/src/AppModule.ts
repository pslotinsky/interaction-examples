import { Module } from '@nestjs/common';

import { AccountModule } from '@account/AccountModule';
import { ConsumerModule } from '@consumer/ConsumerModule';
import { CoreModule } from '@core/CoreModule';
import { OrderModule } from '@order/OrderModule';

@Module({
    imports: [AccountModule, ConsumerModule, CoreModule, OrderModule],
})
export class AppModule {}
