"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var prediction_model_1 = require("../models/prediction.model");
var planet_model_1 = require("../models/planet.model");
var math_helper_1 = require("../helpers/math.helper");
var statistics_model_1 = require("../models/statistics.model");
var PredictionManager = /** @class */ (function () {
    function PredictionManager() {
        this.predictionRepository = typeorm_1.getManager().getRepository(prediction_model_1.PredictionModel);
        this.planetRepository = typeorm_1.getManager().getRepository(planet_model_1.PlanetModel);
        this.statisticsRepository = typeorm_1.getManager().getRepository(statistics_model_1.StatisticsModel);
    }
    PredictionManager.prototype.getPrediction = function (day) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.predictionRepository.findOne({ day: day })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionManager.prototype.getStatistics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.statisticsRepository.findOne()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PredictionManager.prototype.calculate = function (days) {
        return __awaiter(this, void 0, void 0, function () {
            var statistics, predictions, sunPos, vulcano, ferengis, betasoide, currentDay, vulcPos, ferePos, betaPos, prediction, vulcBetaStraight, vulcFereStraight, fereBetaStraight, temp, perimeter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteAll()];
                    case 1:
                        _a.sent();
                        statistics = new statistics_model_1.StatisticsModel();
                        statistics.cantDaysCalculated = days + 1;
                        predictions = [];
                        sunPos = { x: 0, y: 0 };
                        return [4 /*yield*/, this.planetRepository.findOne({ name: 'Vulcano' })];
                    case 2:
                        vulcano = _a.sent();
                        return [4 /*yield*/, this.planetRepository.findOne({ name: 'Ferengis' })];
                    case 3:
                        ferengis = _a.sent();
                        return [4 /*yield*/, this.planetRepository.findOne({ name: 'Betasoides' })];
                    case 4:
                        betasoide = _a.sent();
                        this.validatePlanets([vulcano, ferengis, betasoide]);
                        currentDay = 0;
                        for (; currentDay <= days; currentDay++) {
                            console.log("Day: " + currentDay);
                            vulcPos = this.calculatePlanetPosition(currentDay, vulcano);
                            ferePos = this.calculatePlanetPosition(currentDay, ferengis);
                            betaPos = this.calculatePlanetPosition(currentDay, betasoide);
                            console.log("Vulcano X: " + vulcPos.x + ", Y: " + vulcPos.y);
                            console.log("Ferengis X: " + ferePos.x + ", Y: " + ferePos.y);
                            console.log("Betasoide X: " + betaPos.x + ", Y: " + betaPos.y);
                            prediction = new prediction_model_1.PredictionModel();
                            prediction.day = currentDay;
                            prediction.xVulc = vulcPos.x;
                            prediction.yVulc = vulcPos.y;
                            prediction.xBeta = betaPos.x;
                            prediction.yBeta = betaPos.y;
                            prediction.xFeren = ferePos.x;
                            prediction.yFeren = ferePos.y;
                            vulcBetaStraight = math_helper_1.drawStraight(vulcPos, betaPos);
                            vulcFereStraight = math_helper_1.drawStraight(vulcPos, ferePos);
                            fereBetaStraight = math_helper_1.drawStraight(ferePos, betaPos);
                            if (math_helper_1.isSameStraight(vulcBetaStraight, vulcFereStraight)) {
                                if (math_helper_1.pointInStaright(sunPos, vulcBetaStraight)) {
                                    console.log('SEQUIA');
                                    statistics.cantDrought++;
                                    prediction.weather = 'SEQUIA';
                                }
                                else {
                                    console.log('CNPT');
                                    statistics.cantNTP++;
                                    temp = this.getTemperature(vulcPos, betaPos, ferePos);
                                    prediction.weather = 'CNPT';
                                    prediction.cntTemperature = temp;
                                }
                            }
                            else {
                                // The three lines form a tringle
                                if (math_helper_1.pointInTheTriangle(sunPos, [vulcBetaStraight, vulcFereStraight, fereBetaStraight])) {
                                    console.log('LLUVIA');
                                    statistics.cantRains++;
                                    perimeter = math_helper_1.calculateTrianglePerimeter(vulcPos, betaPos, ferePos);
                                    if (perimeter > statistics.maxRainIntensity) {
                                        statistics.maxRainDay = currentDay;
                                        statistics.maxRainIntensity = perimeter;
                                    }
                                    prediction.weather = 'LLUVIA';
                                    prediction.rainIntensity = perimeter;
                                }
                                else {
                                    console.log('DESCONOCIDO');
                                    statistics.cantUnknouwn++;
                                    prediction.weather = 'DESCONOCIDO';
                                }
                            }
                            predictions.push(prediction);
                        }
                        this.showStatistics(statistics);
                        return [4 /*yield*/, this.statisticsRepository.save(statistics)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.predictionRepository.save(predictions)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PredictionManager.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.predictionRepository.clear()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.statisticsRepository.clear()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PredictionManager.prototype.validatePlanets = function (planets) {
        for (var i = 0; i < planets.length; i++) {
            var planet = planets[i];
            if (planet == null) {
                throw new Error('Planet undefined');
            }
            if (planet.angularVelocity == null || planet.angularVelocity == 0) {
                throw new Error(planet.name + ': Angular velocity must be greater than zero');
            }
            if (planet.distance == null || planet.distance == 0) {
                throw new Error(planet.name + ': Distance not defined');
            }
        }
    };
    PredictionManager.prototype.calculatePlanetPosition = function (day, planet) {
        var deltaDegree = planet.a0 + planet.angularVelocity * day;
        var deltaRad = math_helper_1.degreeToRadians(deltaDegree);
        var xPos = math_helper_1.truncateDecimals(planet.distance * Math.cos(deltaRad), 3);
        var yPos = math_helper_1.truncateDecimals(planet.distance * Math.sin(deltaRad), 3);
        return { x: xPos, y: yPos };
    };
    PredictionManager.prototype.showStatistics = function (statistics) {
        console.log("Cantidad dias calculados: " + statistics.cantDaysCalculated);
        console.log("Sequias: " + statistics.cantDrought);
        console.log("CNPTs: " + statistics.cantNTP);
        console.log("Desconocidos: " + statistics.cantUnknouwn);
        console.log("Lluvias: " + statistics.cantRains);
        console.log("Max dia lluvia: " + statistics.maxRainDay + ", Max intensidad: " + statistics.maxRainIntensity);
    };
    // The temperature comes from max distance between the three points
    // Return temp number in Kelvin
    PredictionManager.prototype.getTemperature = function (pos1, pos2, pos3) {
        var distMax = 3000; // TODO: sum the radius
        var p12 = math_helper_1.distancePointPoint(pos1, pos2);
        var p13 = math_helper_1.distancePointPoint(pos1, pos3);
        var p23 = math_helper_1.distancePointPoint(pos2, pos3);
        var max = Math.max(p12, p13, p23);
        return (max / distMax) * 273;
    };
    return PredictionManager;
}());
exports["default"] = PredictionManager;
//# sourceMappingURL=prediction.manager.js.map