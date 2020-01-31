import { Event } from '@core/CoreModule';

export class CreateAccountEvent extends Event<{ accountId: string }> {}
