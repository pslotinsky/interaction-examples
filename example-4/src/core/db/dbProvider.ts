import { createConnection } from 'typeorm';

import { dbConfig } from './dbConfig';

export const dbProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(dbConfig),
};
