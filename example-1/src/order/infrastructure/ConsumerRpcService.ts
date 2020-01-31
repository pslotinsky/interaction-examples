import axios from 'axios';

import { ConsumerService } from '@order/domain/ConsumerService';
import { ConsumerNotFoundError } from '@order/domain/errors/ConsumerNotFoundError';
import { ConsumerViewModel } from '@core/types';

export class ConsumerRpcService implements ConsumerService {
    public async checkExistence(consumerId: string): Promise<void> {
        const { data } = await axios.get<ConsumerViewModel>(`http://127.0.0.1:3001/consumer/${consumerId}`);

        if (!data) {
            throw new ConsumerNotFoundError(consumerId);
        }
    }
}
