import { Router } from "express"
import postCreatePet from './pets/post-pet';
import getPets from "./pets/get-pets";
import getMostNumerousSpecies from "./pets/get-most-numerous-species";
import getAverageAgeBySpecie from "./pets/get-average-age-by-specie";
import { Container } from "inversify";

export default (container: Container) => {
    const app = Router();
    getPets(app, container);
    getMostNumerousSpecies(app, container);
    getAverageAgeBySpecie(app, container);
    postCreatePet(app, container);

    return app;
}