import { Router } from "express"
import postCreatePet from './pets/post-pet';
import getPets from "./pets/get-pets";

export default () => {
    const app = Router();
    getPets(app);
    postCreatePet(app);

    return app;
}