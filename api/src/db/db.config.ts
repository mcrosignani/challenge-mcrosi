import { createConnection } from 'typeorm';
import { tables } from './db.tables';

export const challengeDB = async () => {
    return await createConnection({
        type     : 'postgres',
        url      : 'postgres://qkcozgqn:EhhPcVU4JW7KBrrw1KGkzyGEck6hE6RL@rajje.db.elephantsql.com:5432/qkcozgqn',
        username : 'qkcozgqn',
        password : 'EhhPcVU4JW7KBrrw1KGkzyGEck6hE6RL',
        database : 'mcrosi-challenge',
        entities: tables,
        ssl: false,
        logging: ['error'],
        synchronize: true,
    }).then((connection) => {
        console.log('Database connection established');
    });
};