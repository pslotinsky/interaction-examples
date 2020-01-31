import { Event } from '@core/CoreModule';

export class PaymentRejectedEvent extends Event<{ orderId: string }> {}
