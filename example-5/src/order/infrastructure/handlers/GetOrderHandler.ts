import { getManager } from 'typeorm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { OrderViewModel } from '@order/application/responses/OrderViewModel';
import { OrderNotFoundError } from '@order/domain/errors/OrderNotFoundError';

import { GetOrderQuery } from '../queries/GetOrderQuery';
import { OrderModel } from '../OrderModel';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
    public async execute({ orderId }: GetOrderQuery): Promise<OrderViewModel> {
        const model = await getManager().findOne(OrderModel, orderId);

        if (!model) {
            throw new OrderNotFoundError(orderId);
        }

        return this.makeResponse(model);
    }

    private makeResponse({ creationTime, ...data }: OrderModel): OrderViewModel {
        return {
            ...data,
            creationTime: creationTime.toISOString(),
        };
    }
}
