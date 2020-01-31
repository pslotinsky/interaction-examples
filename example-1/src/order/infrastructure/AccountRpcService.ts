import axios from 'axios';

import { AccountService } from '@order/domain/AccountService';
import { PayViewModel } from '@core/types';

export class AccountRpcService implements AccountService {
    public async makePayment(accountId: string, amount: number): Promise<boolean> {
        const url = `http://127.0.0.1:3001/account/${accountId}/payment`;
        const { data } = await axios.post<PayViewModel>(url, { amount });
        return data.isSuccessful;
    }
}
