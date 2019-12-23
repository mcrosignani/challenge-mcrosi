import { Repository, getManager } from "typeorm";
import { PlanetModel } from "../models/planet.model";

export default class IntitalDataManager {
    static initialData: PlanetModel[] = [{
        id: 1,
        name: "Vulcano",
        angularVelocity: -5,
        a0: 90,
        distance: 1000,
        x0: 0,
        y0: 1000
    },
    {
        id: 2,
        name: "Ferengis",
        angularVelocity: 1,
        a0: 90,
        distance: 500,
        x0: 0,
        y0: 500
    },
    {
        id: 3,
        name: "Betasoides",
        angularVelocity: 3,
        a0: 90,
        distance: 2000,
        x0: 0,
        y0: 2000
    }];

    public static async loadInitialData() {
        const planetRepository: Repository<PlanetModel> = getManager().getRepository(PlanetModel);

        const planets: PlanetModel[] = await planetRepository.find();
        
        if (planets.length == 0) {
            for (let i = 0; i < this.initialData.length; i++) {
                await planetRepository.save(this.initialData[i]);
            }
        }
    }
}