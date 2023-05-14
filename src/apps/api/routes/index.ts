import { Router } from "express"
import postCreatePet from './pets/post-pet';
import getPets from "./pets/get-pets";
import getMostNumerousSpecies from "./pets/get-most-numerous-especies";

export default () => {
    const app = Router();
    getPets(app);
    getMostNumerousSpecies(app);
    postCreatePet(app);

    return app;
}