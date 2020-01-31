import { IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferBody {
    @ApiProperty()
    @IsPositive()
    public amount!: number;
}
