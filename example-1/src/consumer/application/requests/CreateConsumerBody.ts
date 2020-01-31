import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class CreateConsumerBody {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    public consumerId!: string;

    @ApiProperty()
    @IsString()
    public name!: string;
}
