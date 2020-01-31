import { Module } from '@nestjs/common';

import { AccountController } from './application/AccountController';
import { AccountService } from './domain/AccountService';
import { AccountRepository } from './domain/AccountRepository';
import { AccountDbRepository } from './infrastructure/AccountDbRepository';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    { provide: AccountRepository, useClass: AccountDbRepository },
  ],
})
export class AccountModule {}
