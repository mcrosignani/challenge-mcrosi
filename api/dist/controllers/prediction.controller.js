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
var prediction_manager_1 = require("../managers/prediction.manager");
var process_manager_1 = require("../managers/process.manager");
var process_model_1 = require("../models/process.model");
var PredictionController = /** @class */ (function () {
    function PredictionController() {
    }
    PredictionController.getLast = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var processManager, last, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        processManager = new process_manager_1["default"]();
                        return [4 /*yield*/, processManager.getLastProcess()];
                    case 1:
                        last = _a.sent();
                        ctx.staus = 200;
                        ctx.body = last;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        ctx.status = 500;
                        ctx.body = {
                            "Error": true,
                            "Msg": error_1.message
                        };
                        return [2 /*return*/, ctx];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PredictionController.calculate = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var process, processManager, days, pending, predictionManager, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        process = new process_model_1.ProcessModel();
                        processManager = new process_manager_1["default"]();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, 6, 8]);
                        days = ctx.request.body.days;
                        if (days == null) {
                            ctx.status = 400;
                            ctx.body = {
                                "Error": true,
                                "Msg": "Missing days parameter. Must be greater than zero"
                            };
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, processManager.getPendingProcess()];
                    case 2:
                        pending = _a.sent();
                        if (pending != null) {
                            ctx.status = 400;
                            ctx.body = {
                                "Error": true,
                                "Msg": "There is a pending process"
                            };
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, processManager.initProcess(days)];
                    case 3:
                        process = _a.sent();
                        predictionManager = new prediction_manager_1["default"]();
                        return [4 /*yield*/, predictionManager.calculate(days)];
                    case 4:
                        _a.sent();
                        ctx.staus = 200;
                        ctx.body = {
                            "Error": false,
                            "Msg": "Calculate succesfully"
                        };
                        return [3 /*break*/, 8];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        ctx.status = 500;
                        ctx.body = {
                            "Error": true,
                            "Msg": error_2.message
                        };
                        return [2 /*return*/, ctx];
                    case 6: return [4 /*yield*/, processManager.finalizeProcess(process)];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return PredictionController;
}());
exports["default"] = PredictionController;
//# sourceMappingURL=prediction.controller.js.map