import { Request, Router, Response } from "express";
import { GetMostNumerousSpecies } from "../../../contexts/application";
import container from "../../../../inversify.config";
const route = Router();

/**
 * @api {get} / user route for get pets/most_numerous_species
 */

export default (app: Router) => {
    app.use('/most_numerous_species', route);

    route.get('',
        async (req: Request, res: Response, next) => {
            try {
                const getMostNumerousSpecies = container.get<GetMostNumerousSpecies>(GetMostNumerousSpecies)
                const response = await getMostNumerousSpecies.run();
                if (response) {
                    res.status(201).json(response);
                } else {
                    res.status(500).json(response)
                }
            } catch (error) {
                next(new Error(error as any));
            }
        }
    )
}