import { ApiResponseProperty } from '@nestjs/swagger';

export class PayViewModel {
    @ApiResponseProperty()
    isSuccessful!: boolean;
}
