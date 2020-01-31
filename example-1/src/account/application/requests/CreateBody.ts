import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateBody {
    @ApiProperty({ format: 'uuid' })
    @IsUUID()
    public accountId!: string;
}
