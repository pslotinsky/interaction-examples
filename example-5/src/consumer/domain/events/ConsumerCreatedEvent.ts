export class ConsumerCreatedEvent {
    public static makeId(consumerId: string): string {
        return `${ConsumerCreatedEvent.name}_${consumerId}`;
    }

    constructor(public readonly consumerId: string) {}

    public get id(): string {
        return ConsumerCreatedEvent.makeId(this.consumerId);
    }
}
