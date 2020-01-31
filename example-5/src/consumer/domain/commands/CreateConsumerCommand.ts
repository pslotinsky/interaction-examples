interface Params {
    consumerId: string;
    name: string;
}

export class CreateConsumerCommand {
    constructor(public readonly data: Params) {}
}
