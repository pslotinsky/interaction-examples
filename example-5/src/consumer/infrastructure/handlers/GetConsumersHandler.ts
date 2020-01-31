import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetConsumersQuery } from '../queries/GetConsumersQuery';
import { ConsumerViewModel } from '../../application/responses/ConsumerViewModel';
import { ConsumerModel } from '../ConsumerModel';

@QueryHandler(GetConsumersQuery)
export class GetConsumersHandler implements IQueryHandler<GetConsumersQuery> {
    public async execute(query: GetConsumersQuery): Promise<ConsumerViewModel[]> {
        const models = await getManager().find(ConsumerModel, query);

        return this.makeGetListResponse(models);
    }

    private makeGetListResponse(consumers: ConsumerModel[]): ConsumerViewModel[] {
        return consumers.map(({ creationTime, ...data }) => ({
            ...data,
            creationTime: creationTime.toISOString(),
        }));
    }
}
