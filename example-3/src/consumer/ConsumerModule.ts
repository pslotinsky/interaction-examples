import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { ConsumerController } from './application/ConsumerController';
import { ConsumerService } from './domain/ConsumerService';
import { ConsumerRepository } from './domain/ConsumerRepository';
import { ConsumerCreatedEvent } from './domain/events/ConsumerCreatedEvent';
import { ConsumerVerifiedEvent } from './domain/events/ConsumerVerifiedEvent';
import { ConsumerDbRepository } from './infrastructure/ConsumerDbRepository';

@Module({
  imports: [CoreModule],
  controllers: [ConsumerController],
  providers: [
    ConsumerService,
    { provide: ConsumerRepository, useClass: ConsumerDbRepository },
  ],
})
export class ConsumerModule {}

export { ConsumerCreatedEvent, ConsumerVerifiedEvent };
