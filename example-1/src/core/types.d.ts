export interface ConsumerViewModel {
    readonly consumerId: string; // uuid
    readonly name: string;
    readonly creationTime: string; // date-time
}
export interface CreateBody {
    accountId: string; // uuid
}
export interface CreateConsumerBody {
    consumerId: string; // uuid
    name: string;
}
export interface CreateOrderBody {
    orderId: string; // uuid
    consumerId: string; // uuid
    price: number;
}
export interface OrderViewModel {
    readonly orderId: string; // uuid
    readonly consumerId: string; // uuid
    readonly status: "WaitingForPayment" | "PaymentApproved" | "PaymentRejected";
    readonly creationTime: string; // date-time
}
export namespace Parameters {
    export type AccountId = string;
    export type ConsumerId = string;
}
export interface PathParameters {
    consumerId: Parameters.ConsumerId;
}
export interface PayViewModel {
    readonly isSuccessful: boolean;
}
export type RequestBody = TransferBody;
export namespace Responses {
    export type $201 = PayViewModel;
    export type Undefined = ConsumerViewModel;
}
export interface TransferBody {
    amount: number;
}
