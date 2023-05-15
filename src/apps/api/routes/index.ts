import { Router } from "express"
import postCreatePet from './pets/post-pet';
import getPets from "./pets/get-pets";
import getMostNumerousSpecies from "./pets/get-most-numerous-species";
import getAverageAgeBySpecie from "./pets/get-average-age-by-specie";

export default () => {
    const app = Router();
    getPets(app);
    getMostNumerousSpecies(app);
    getAverageAgeBySpecie(app);
    postCreatePet(app);

    return app;
}