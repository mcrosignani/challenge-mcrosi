import { challengeDB } from './db/db.config';
import { router } from './routes/routes';
import * as bodyParser from 'koa-bodyparser';
import IntitalDataManager from './managers/initial-data.manager';

var app = require('./app');

const bootstrap = async () => {
    await challengeDB();

    app.use(bodyParser());
    
    app.use(router.routes(), router.allowedMethods())

    await IntitalDataManager.loadInitialData();
    
    app.listen(8080);
};

bootstrap();