export interface ConsumerViewModel {
    readonly consumerId: string; // uuid
    readonly name: string;
    readonly status: string;
    readonly creationTime: string; // date-time
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
    readonly status: "ApprovalPending" | "PaymentApproved" | "PaymentRejected";
    readonly creationTime: string; // date-time
}
export namespace Parameters {
    export type AccountId = string;
}
export interface PathParameters {
    accountId: Parameters.AccountId;
}
export type RequestBody = CreateConsumerBody;
export namespace Responses {
    export type Undefined = ConsumerViewModel[];
}
export interface TransferBody {
    amount: number;
}
