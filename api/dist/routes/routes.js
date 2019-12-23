"use strict";
exports.__esModule = true;
var Router = require("koa-router");
var controller = require("../controllers");
exports.router = new Router();
// Prediction
exports.router.get('/', controller.prediction.getLast);
exports.router.post('/prediction', controller.prediction.calculate);
// Vulcano
exports.router.get('/vulcano/:day', controller.vulcano.getPrediction);
// Statistics
exports.router.get('/statistics', controller.statistics.getStatistics);
//# sourceMappingURL=routes.js.map