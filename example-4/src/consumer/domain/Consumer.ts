interface Params {
    consumerId: string;
    name: string;
    status?: ConsumerStatus;
    creationTime?: Date;
}

export enum ConsumerStatus {
    ApprovalPending = 'ApprovalPending',
    Approved = 'Approved',
}

export class Consumer {
    public consumerId: string;
    public name: string;
    public creationTime: Date;
    public status: ConsumerStatus;

    constructor({
        consumerId,
        name,
        status = ConsumerStatus.ApprovalPending,
        creationTime = new Date(),
    }: Params) {
        this.consumerId = consumerId;
        this.name = name;
        this.status = status;
        this.creationTime = creationTime;
    }

    public approve(): void {
        this.status = ConsumerStatus.Approved;
    }
}
