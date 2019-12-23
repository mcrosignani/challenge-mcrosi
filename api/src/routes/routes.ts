import * as Router from 'koa-router';
import controller = require('../controllers');

export const router = new Router();

// Prediction
router.get('/', controller.prediction.getLast);
router.post('/prediction', controller.prediction.calculate);

// Vulcano
router.get('/vulcano/:day', controller.vulcano.getPrediction);

// Statistics
router.get('/statistics', controller.statistics.getStatistics);