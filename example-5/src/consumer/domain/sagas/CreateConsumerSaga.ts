import { Injectable } from '@nestjs/common';
import { Saga, ofType, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountCreatedEvent, CreateAccountCommand } from '@account/AccountModule';

import { ApproveConsumerCommand } from '../commands/ApproveConsumerCommand';
import { ConsumerCreatedEvent } from '../events/ConsumerCreatedEvent';

@Injectable()
export class CreateConsumerSaga {
    @Saga()
    onConsumerCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(ConsumerCreatedEvent),
            map(event => new CreateAccountCommand(event.consumerId)),
        );
    }

    @Saga()
    onAccountCreated = (events$: Observable<any>): Observable<ICommand> => {
        return events$.pipe(
            ofType(AccountCreatedEvent),
            map(event => new ApproveConsumerCommand(event.accountId)),
        );
    }
}
