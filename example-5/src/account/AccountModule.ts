import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { AccountController } from './application/AccountController';
import { AccountRepository } from './domain/AccountRepository';
import { AccountCreatedEvent } from './domain/events/AccountCreatedEvent';
import { PaymentApprovedEvent } from './domain/events/PaymentApprovedEvent';
import { PaymentRejectedEvent } from './domain/events/PaymentRejectedEvent';
import { CreateAccountCommand } from './domain/commands/CreateAccountCommand';
import { MakePaymentCommand } from './domain/commands/MakePaymentCommand';
import { CreateAccountHandler } from './domain/handlers/CreateAccountHandler';
import { MakePaymentHandler } from './domain/handlers/MakePaymentHandler';
import { ReplenishHandler } from './domain/handlers/ReplenishHandler';
import { AccountDbRepository } from './infrastructure/AccountDbRepository';

const commandHandlers = [CreateAccountHandler, MakePaymentHandler, ReplenishHandler];
const repositories = [{ provide: AccountRepository, useClass: AccountDbRepository }];

@Module({
    imports: [CoreModule],
    controllers: [AccountController],
    providers: [
        ...commandHandlers,
        ...repositories,
    ],
})
export class AccountModule {}

export {
    CreateAccountCommand,
    MakePaymentCommand,
    AccountCreatedEvent,
    PaymentApprovedEvent,
    PaymentRejectedEvent,
};
