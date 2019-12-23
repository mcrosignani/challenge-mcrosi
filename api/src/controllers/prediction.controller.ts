import { BaseContext } from 'koa';
import PredictionManager from '../managers/prediction.manager';
import ProcessManager from '../managers/process.manager';
import { ProcessModel } from '../models/process.model';

export default class PredictionController {
    public static async getLast(ctx: BaseContext) {
        try {
            const processManager = new ProcessManager();
            const last = await processManager.getLastProcess();

            ctx.staus = 200;
            ctx.body = last;
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

    public static async calculate(ctx: BaseContext) {
        let process: ProcessModel = new ProcessModel();
        const processManager = new ProcessManager();

        try {
            const days = ctx.request.body.days;
            if (days == null) {
                ctx.status = 400;
                ctx.body = {
                    "Error": true,
                    "Msg": "Missing days parameter. Must be greater than zero"
                };

                return;
            }

            const pending = await processManager.getPendingProcess();
            if (pending != null) {
                ctx.status = 400;
                ctx.body = {
                    "Error": true,
                    "Msg": "There is a pending process"
                };

                return;
            }

            process = await processManager.initProcess(days);

            const predictionManager = new PredictionManager();
            await predictionManager.calculate(days);

            ctx.staus = 200;
            ctx.body = {
                "Error": false,
                "Msg": "Calculate succesfully"
            };
        } catch (error) {
            console.log(error);

            ctx.status = 500;
            ctx.body = {
                "Error": true,
                "Msg": error.message
            };

            return ctx;
        } finally {
            await processManager.finalizeProcess(process);
        }
    }
}