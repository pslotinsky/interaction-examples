import { Module } from '@nestjs/common';

import { DatabaseModule } from '@core/db/DatabaseModule';

import { ConsumerController } from './application/ConsumerController';
import { ConsumerService } from './domain/ConsumerService';
import { ConsumerRepository } from './domain/ConsumerRepository';
import { AccountService } from './domain/AccountService';
import { ConsumerDbRepository } from './infrastructure/ConsumerDbRepository';
import { AccountRpcService } from './infrastructure/AccountRpcService';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    { provide: ConsumerRepository, useClass: ConsumerDbRepository },
    { provide: AccountService, useClass: AccountRpcService },
  ],
})
export class ConsumerModule {}
