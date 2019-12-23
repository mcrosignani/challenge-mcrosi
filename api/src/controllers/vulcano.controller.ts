import { BaseContext } from 'koa';
import PredictionManager from '../managers/prediction.manager';

export default class VulcanoController {
    public static async getPrediction(ctx: BaseContext) {
        try {
            const day = ctx.params.day;
            if (day == null) {
                ctx.status = 400;
                ctx.body = {
                    "Error": true,
                    "Msg": "Missing day parameter"
                };

                return;
            }

            const predictionManager = new PredictionManager();
            const prediction = await predictionManager.getPrediction(day);
            if (prediction == null) {
                ctx.status = 200;
                ctx.body = {
                    "Error": false,
                    "Msg": "The prediction doesn´t exists for that day"
                };

                return;
            }

            ctx.status = 200;
            ctx.body = {
                "Error": false,
                "Prediction": prediction
            };
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