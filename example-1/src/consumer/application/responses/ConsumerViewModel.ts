import { ApiResponseProperty } from '@nestjs/swagger';

export class ConsumerViewModel {
    @ApiResponseProperty({ format: 'uuid' })
    consumerId!: string;

    @ApiResponseProperty()
    name!: string;

    @ApiResponseProperty({ format: 'date-time' })
    creationTime!: string;
}
