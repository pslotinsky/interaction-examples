export abstract class Event<T = any> {
    public readonly data: T;

    constructor(data: T) {
        this.data = data;
    }
}

export interface EventConstructor {
    name: string;
}
