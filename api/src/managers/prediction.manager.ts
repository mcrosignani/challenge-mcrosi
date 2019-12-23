import { Repository, getManager } from "typeorm";
import { PredictionModel } from "../models/prediction.model";
import { PlanetModel } from "../models/planet.model";
import { CoordinateModel } from "../models/coordinate.model";
import { drawStraight, 
    degreeToRadians, 
    truncateDecimals, 
    isSameStraight, 
    pointInStaright, 
    pointInTheTriangle, 
    calculateTrianglePerimeter,
    distancePointPoint } from "../helpers/math.helper";
import { StraigthModel } from "../models/straight.model";
import { StatisticsModel } from "../models/statistics.model";

export default class PredictionManager {
    private predictionRepository: Repository<PredictionModel>;
    private planetRepository: Repository<PlanetModel>;
    private statisticsRepository: Repository<StatisticsModel>;

    constructor() {
        this.predictionRepository = getManager().getRepository(PredictionModel);
        this.planetRepository = getManager().getRepository(PlanetModel);
        this.statisticsRepository = getManager().getRepository(StatisticsModel);
    }

    public async getPrediction(day: number) {
        return await this.predictionRepository.findOne({day: day});
    }

    public async getStatistics() {
        return await this.statisticsRepository.findOne();
    }

    public async calculate(days: number) {
        await this.deleteAll();

        const statistics = new StatisticsModel();
        statistics.cantDaysCalculated = days + 1;

        const predictions: PredictionModel[] = [];

        const sunPos: CoordinateModel = { x: 0, y: 0 };

        const vulcano = await this.planetRepository.findOne({name: 'Vulcano'});
        const ferengis = await this.planetRepository.findOne({name: 'Ferengis'});
        const betasoide = await this.planetRepository.findOne({name: 'Betasoides'});

        this.validatePlanets([vulcano, ferengis, betasoide]);

        let currentDay = 0;
        for (; currentDay <= days; currentDay++) {
            console.log(`Day: ${currentDay}`);

            // Calculate Position of all planets
            const vulcPos: CoordinateModel = this.calculatePlanetPosition(currentDay, vulcano);
            const ferePos: CoordinateModel = this.calculatePlanetPosition(currentDay, ferengis);
            const betaPos: CoordinateModel = this.calculatePlanetPosition(currentDay, betasoide);

            console.log(`Vulcano X: ${vulcPos.x}, Y: ${vulcPos.y}`);
            console.log(`Ferengis X: ${ferePos.x}, Y: ${ferePos.y}`);
            console.log(`Betasoide X: ${betaPos.x}, Y: ${betaPos.y}`);

            const prediction = new PredictionModel();

            prediction.day = currentDay;
            prediction.xVulc = vulcPos.x;
            prediction.yVulc = vulcPos.y;
            prediction.xBeta = betaPos.x;
            prediction.yBeta = betaPos.y;
            prediction.xFeren = ferePos.x;
            prediction.yFeren = ferePos.y;

            const vulcBetaStraight: StraigthModel = drawStraight(vulcPos, betaPos);
            const vulcFereStraight: StraigthModel = drawStraight(vulcPos, ferePos);
            const fereBetaStraight: StraigthModel = drawStraight(ferePos, betaPos);

            if (isSameStraight(vulcBetaStraight, vulcFereStraight)) {
                if (pointInStaright(sunPos, vulcBetaStraight)) {
                    console.log('SEQUIA');
                    statistics.cantDrought++;

                    prediction.weather = 'SEQUIA';
                } else {
                    console.log('CNPT');
                    statistics.cantNTP++;

                    const temp = this.getTemperature(vulcPos, betaPos, ferePos);
                    prediction.weather = 'CNPT';
                    prediction.cntTemperature = temp;
                }
            } else {
                // The three lines form a tringle
                if (pointInTheTriangle(sunPos, [vulcBetaStraight, vulcFereStraight, fereBetaStraight])) {
                    console.log('LLUVIA');
                    statistics.cantRains++;

                    const perimeter = calculateTrianglePerimeter(vulcPos, betaPos, ferePos);
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

        await this.statisticsRepository.save(statistics);
        await this.predictionRepository.save(predictions);
    }

    private async deleteAll(){
        await this.predictionRepository.clear();
        await this.statisticsRepository.clear();
    }

    private validatePlanets(planets: PlanetModel[]) {
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];
            if (planet == null) {
                throw new Error('Planet undefined')
            }

            if (planet.angularVelocity == null || planet.angularVelocity == 0) {
                throw new Error(planet.name + ': Angular velocity must be greater than zero')
            }

            if (planet.distance == null || planet.distance == 0) {
                throw new Error(planet.name + ': Distance not defined')
            }
        }
    }

    private calculatePlanetPosition(day: number, planet: PlanetModel) {
        const deltaDegree = planet.a0 + planet.angularVelocity * day;
        const deltaRad = degreeToRadians(deltaDegree);

        const xPos: number = truncateDecimals(planet.distance * Math.cos(deltaRad), 3);
        const yPos: number = truncateDecimals(planet.distance * Math.sin(deltaRad), 3);

        return { x: xPos, y: yPos}
    }

    private showStatistics(statistics: StatisticsModel) {
        console.log(`Cantidad dias calculados: ${statistics.cantDaysCalculated}`);
        console.log(`Sequias: ${statistics.cantDrought}`);
        console.log(`CNPTs: ${statistics.cantNTP}`);
        console.log(`Desconocidos: ${statistics.cantUnknouwn}`);
        console.log(`Lluvias: ${statistics.cantRains}`);
        console.log(`Max dia lluvia: ${statistics.maxRainDay}, Max intensidad: ${statistics.maxRainIntensity}`);
    }

    // The temperature comes from max distance between the three points
    // Return temp number in Kelvin
    private getTemperature(pos1: CoordinateModel, pos2: CoordinateModel, pos3: CoordinateModel) {
        const distMax = 3000;// TODO: sum the radius
        
        const p12 = distancePointPoint(pos1, pos2);
        const p13 = distancePointPoint(pos1, pos3);
        const p23 = distancePointPoint(pos2, pos3);

        const max = Math.max(p12, p13, p23);

        return (max / distMax) * 273;
    }
}