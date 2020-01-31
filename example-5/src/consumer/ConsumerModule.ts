import { Module } from '@nestjs/common';

import { CoreModule } from '@core/CoreModule';

import { ConsumerController } from './application/ConsumerController';
import { ConsumerRepository } from './domain/ConsumerRepository';
import { ConsumerVerifiedEvent } from './domain/events/ConsumerVerifiedEvent';
import { VerifyConsumerCommand } from './domain/commands/VerifyConsumerCommand';
import { CreateConsumerSaga } from './domain/sagas/CreateConsumerSaga';
import { CreateConsumerHandler } from './domain/handlers/CreateConsumerHandler';
import { ApproveConsumerHandler } from './domain/handlers/ApproveConsumerHandler';
import { VerifyConsumerHandler } from './domain/handlers/VerifyConsumerHandler';
import { ConsumerDbRepository } from './infrastructure/ConsumerDbRepository';
import { GetConsumersHandler } from './infrastructure/handlers/GetConsumersHandler';

const commandHandlers = [CreateConsumerHandler, ApproveConsumerHandler, VerifyConsumerHandler];
const queryHandlers = [GetConsumersHandler];
const sagas = [CreateConsumerSaga];
const repositories = [
    { provide: ConsumerRepository, useClass: ConsumerDbRepository },
];

@Module({
    imports: [CoreModule],
    controllers: [ConsumerController],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...sagas,
        ...repositories,
    ],
})
export class ConsumerModule {}

export { ConsumerVerifiedEvent, VerifyConsumerCommand };
