import { CommandBus, EventBus } from '@nestjs/cqrs';
import { TestingModule } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces';

interface Ctor<T> {
    new (...args: any[]): T;
    makeId(id: string): string;
}

const publishedEvents = new Map();
const executedCommands = new Map();

export function getExecutedCommand<T>(ctor: Ctor<T>, id: string): T {
    const command = executedCommands.get(ctor.makeId(id));
    expect(command).toBeDefined();
    return command;
}

export function getPublishedEvent<T>(ctor: Ctor<T>, id: string): T {
    const event = publishedEvents.get(ctor.makeId(id));
    expect(event).toBeDefined();
    return event;
  }

export function trackCommand<T extends { id: string }>(commandBus: CommandBus, ctor: Ctor<T>) {
    commandBus.bind({
        execute: async (command: T) => executedCommands.set(command.id, command),
    }, ctor.name);
  }

export function trackEvent<T extends { id: string }>(eventBus: EventBus, ctor: Ctor<T>) {
    eventBus.bind({
        handle: async (event: T) => publishedEvents.set(event.id, event),
    }, ctor.name);
}
