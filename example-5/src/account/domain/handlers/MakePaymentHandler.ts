import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { MakePaymentCommand } from '../commands/MakePaymentCommand';
import { AccountRepository } from '../AccountRepository';
import { Account } from '../Account';

@CommandHandler(MakePaymentCommand)
export class MakePaymentHandler implements ICommandHandler<MakePaymentCommand> {
    @Inject() private accountRepository: AccountRepository;
    @Inject() private eventPublisher: EventPublisher;

    public async execute({ payment }: MakePaymentCommand): Promise<void> {
        const account = await this.findOne(payment.accountId);
        account.pay(payment.orderId, payment.amount);
        await this.save(account);
    }

    private async findOne(accountId: string): Promise<Account> {
        const account = await this.accountRepository.findOneOrFail(accountId);
        return this.eventPublisher.mergeObjectContext(account);
    }

    private async save(account: Account): Promise<void> {
        await this.accountRepository.save(account);
        account.commit();
    }
}
