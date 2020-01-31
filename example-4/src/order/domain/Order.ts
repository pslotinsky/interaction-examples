interface Params {
    consumerId: string;
    orderId: string;
    price: number;
    status?: OrderStatus;
    creationTime?: Date;
}

export enum OrderStatus {
    ApprovalPending = 'ApprovalPending',
    PaymentApproved = 'PaymentApproved',
    PaymentRejected = 'PaymentRejected',
}

export class Order {
    public orderId: string;
    public consumerId: string;
    public price: number;
    public status: OrderStatus;
    public creationTime: Date;

    constructor({
        consumerId,
        orderId,
        price,
        status = OrderStatus.ApprovalPending,
        creationTime = new Date(),
    }: Params) {
        this.orderId = orderId;
        this.consumerId = consumerId;
        this.price = price;
        this.status = status;
        this.creationTime = creationTime;
    }

    public approvePayment(): void {
        this.status = OrderStatus.PaymentApproved;
    }

    public rejectPayment(): void {
        this.status = OrderStatus.PaymentRejected;
    }
}
