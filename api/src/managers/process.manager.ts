import { Repository, getManager } from "typeorm";
import { ProcessModel } from "../models/process.model";

export default class ProcessManager {
    private processRepository: Repository<ProcessModel>;

    constructor() {
        this.processRepository = getManager().getRepository(ProcessModel);
    }

    public async getPendingProcess() {
        return await this.processRepository.findOne({status: 'Pending'});
    }

    public async initProcess(totalDays: number) {
        const process = new ProcessModel();
        process.date = new Date();
        process.status = "Pending";
        process.totalDays = totalDays;
        return await this.processRepository.save(process);
    }

    public async finalizeProcess(process: ProcessModel) {
        process.status = "Done";
        await this.processRepository.save(process);
    }

    public async getLastProcess() {
        const proc = await this.processRepository.findOne({order: {date: "DESC"}});
        return proc;
    }
}