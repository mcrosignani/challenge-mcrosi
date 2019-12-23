"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var ProcessModel = /** @class */ (function () {
    function ProcessModel() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], ProcessModel.prototype, "id");
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], ProcessModel.prototype, "totalDays");
    __decorate([
        typeorm_1.Column('date'),
        __metadata("design:type", Date)
    ], ProcessModel.prototype, "date");
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], ProcessModel.prototype, "status");
    ProcessModel = __decorate([
        typeorm_1.Entity('Process')
    ], ProcessModel);
    return ProcessModel;
}());
exports.ProcessModel = ProcessModel;
//# sourceMappingURL=process.model.js.map