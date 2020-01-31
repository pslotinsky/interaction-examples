import { ApiResponseProperty } from '@nestjs/swagger';

import { ConsumerStatus } from '@consumer/domain/Consumer';

export class ConsumerViewModel {
    @ApiResponseProperty({ format: 'uuid' })
    consumerId!: string;

    @ApiResponseProperty()
    name!: string;

    @ApiResponseProperty()
    status!: ConsumerStatus;

    @ApiResponseProperty({ format: 'date-time' })
    creationTime!: string;
}
