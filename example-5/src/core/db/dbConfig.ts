import { ConnectionOptions } from 'typeorm';

export const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    logging: ['error'],
    username: 'gorod',
    password: '123qwe',
    database: 'interaction_example',
    migrations: [__dirname + '/../../**/infrastructure/migrations/*.js'],
    entities: [__dirname + '/../../**/infrastructure/**/*Model{.ts,.js}'],
};
