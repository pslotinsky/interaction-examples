import { ICommandHandler, CommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { CreateAccountCommand } from '../commands/CreateAccountCommand';
import { AccountRepository } from '../AccountRepository';
import { Account } from '../Account';
import { AccountCreatedEvent } from '../events/AccountCreatedEvent';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler implements ICommandHandler<CreateAccountCommand> {
    @Inject() private accountRepository: AccountRepository;
    @Inject() private eventBus: EventBus;

    public async execute({ accountId }: CreateAccountCommand): Promise<void> {
        const account = new Account({ accountId });
        await this.create(account);
    }

    private async create(account: Account): Promise<void> {
        await this.accountRepository.create(account);
        this.eventBus.publish(new AccountCreatedEvent(account.accountId));
    }
}
