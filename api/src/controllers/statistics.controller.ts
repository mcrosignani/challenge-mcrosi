import { BaseContext } from 'koa';
import PredictionManager from '../managers/prediction.manager';

export default class StatisticsController {
    public static async getStatistics(ctx: BaseContext) {
        try {
            const predictionManager = new PredictionManager();
            const statistics = await predictionManager.getStatistics();

            ctx.status = 200;
            ctx.body = statistics;
        } catch (error) {
            console.log(error);

            ctx.status = 500;
            ctx.body = {
                "Error": true,
                "Msg": error.message
            };

            return ctx;
        }
    }
}