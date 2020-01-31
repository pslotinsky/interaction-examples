import { IsUUID, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderBody {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    public orderId!: string;

    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    public consumerId!: string;

    @ApiProperty()
    @IsPositive()
    public price!: number;
}
