import { Inject, Injectable } from '@nestjs/common';

import { ConsumerService } from './domain/ConsumerService';

@Injectable()
export class ConsumerFacade {
    @Inject() consumerService: ConsumerService;

    public async checkExistence(consumerId: string): Promise<void> {
        await this.consumerService.checkExistence(consumerId);
    }
}
