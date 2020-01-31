import axios from 'axios';

import { AccountService } from '@consumer/domain/AccountService';

export class AccountRpcService implements AccountService {
    public async create(accountId: string): Promise<boolean> {
        let result = true;

        try {
            await axios.post('http://127.0.0.1:3001/account', { accountId });
        } catch (error) {
            result = false;
        }

        return result;
    }
}
