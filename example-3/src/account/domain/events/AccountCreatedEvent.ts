import { Event } from '@core/CoreModule';

export class AccountCreatedEvent extends Event<{ accountId: string }> {}
