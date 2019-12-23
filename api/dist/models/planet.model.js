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
var PlanetModel = /** @class */ (function () {
    function PlanetModel() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "id");
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], PlanetModel.prototype, "name");
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "distance");
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "angularVelocity");
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "a0");
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "x0");
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], PlanetModel.prototype, "y0");
    PlanetModel = __decorate([
        typeorm_1.Entity('Planets')
    ], PlanetModel);
    return PlanetModel;
}());
exports.PlanetModel = PlanetModel;
//# sourceMappingURL=planet.model.js.map