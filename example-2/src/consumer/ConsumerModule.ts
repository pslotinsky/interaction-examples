import { Module } from '@nestjs/common';

import { AccountModule } from '@account/AccountModule';
import { CoreModule } from '@core/CoreModule';

import { ConsumerController } from './application/ConsumerController';
import { ConsumerService } from './domain/ConsumerService';
import { ConsumerRepository } from './domain/ConsumerRepository';
import { ConsumerDbRepository } from './infrastructure/ConsumerDbRepository';

import { ConsumerFacade } from './ConsumerFacade';

@Module({
  imports: [CoreModule, AccountModule],
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    ConsumerFacade,
    { provide: ConsumerRepository, useClass: ConsumerDbRepository },
  ],
  exports: [ConsumerFacade],
})
export class ConsumerModule {}
