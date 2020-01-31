import { Event } from '@core/CoreModule';

export class PaymentApprovedEvent extends Event<{ orderId: string }> {}
