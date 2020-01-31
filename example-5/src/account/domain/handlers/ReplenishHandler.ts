import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { ReplenishCommand } from '../commands/ReplenishCommand';
import { AccountRepository } from '../AccountRepository';

@CommandHandler(ReplenishCommand)
export class ReplenishHandler implements ICommandHandler<ReplenishCommand> {
    @Inject() private accountRepository: AccountRepository;

    public async execute({ accountId, amount }: ReplenishCommand): Promise<void> {
        const account = await this.accountRepository.findOneOrFail(accountId);
        account.replenish(amount);
        await this.accountRepository.save(account);
    }

}
