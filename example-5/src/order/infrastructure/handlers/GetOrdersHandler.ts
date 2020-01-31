import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderViewModel } from '@order/application/responses/OrderViewModel';

import { GetOrdersQuery } from '../queries/GetOrdersQuery';
import { OrderModel } from '../OrderModel';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
    public async execute(query: GetOrdersQuery): Promise<OrderViewModel[]> {
        const models = await getManager().find(OrderModel, query);

        return this.makeResponse(models);
    }

    private makeResponse(models: OrderModel[]): OrderViewModel[] {
        return models.map(item => ({
            ...item,
            creationTime: item.creationTime.toISOString(),
        }));
    }
}
