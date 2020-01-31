import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { AccountController } from './application/AccountController';
import { AccountService } from './domain/AccountService';
import { AccountRepository } from './domain/AccountRepository';
import { AccountDbRepository } from './infrastructure/AccountDbRepository';

import { AccountFacade } from './AccountFacade';

@Module({
  imports: [CoreModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountFacade,
    { provide: AccountRepository, useClass: AccountDbRepository },
  ],
  exports: [AccountFacade],
})
export class AccountModule {}
