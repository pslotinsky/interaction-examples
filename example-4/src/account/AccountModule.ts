import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { AccountController } from './application/AccountController';
import { AccountService } from './domain/AccountService';
import { AccountRepository } from './domain/AccountRepository';
import { AccountCreatedEvent } from './domain/events/AccountCreatedEvent';
import { CreateAccountEvent } from './domain/events/CreateAccountEvent';
import { MakePaymentEvent } from './domain/events/MakePaymentEvent';
import { PaymentApprovedEvent } from './domain/events/PaymentApprovedEvent';
import { PaymentRejectedEvent } from './domain/events/PaymentRejectedEvent';
import { AccountDbRepository } from './infrastructure/AccountDbRepository';

@Module({
  imports: [CoreModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: AccountRepository, useClass: AccountDbRepository },
  ],
})
export class AccountModule {}

export { AccountCreatedEvent, CreateAccountEvent, MakePaymentEvent, PaymentApprovedEvent, PaymentRejectedEvent };
