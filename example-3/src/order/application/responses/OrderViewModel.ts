import { ApiResponseProperty } from '@nestjs/swagger';

import { OrderStatus } from '@order/domain/Order';

export class OrderViewModel {
    @ApiResponseProperty({ format: 'uuid' })
    orderId!: string;

    @ApiResponseProperty({ format: 'uuid' })
    consumerId!: string;

    @ApiResponseProperty({ enum: Object.keys(OrderStatus) })
    status!: OrderStatus;

    @ApiResponseProperty({ format: 'date-time' })
    creationTime!: string;
}
