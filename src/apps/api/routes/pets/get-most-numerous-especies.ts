import { Request, Router, Response } from "express";
import { GetMostNumerousEspecies } from "../../../../contexts/application";
import container from "../../inversify.config";

const route = Router();

/**
 * @api {get} / user route for get pets/most_numerous_species
 */

export default (app: Router) => {
    app.use('/pets/most_numerous_species', route);

    route.get('',
        async (req: Request, res: Response, next) => {
            try {
                const getMostNumerousSpecies = container.get<GetMostNumerousEspecies>(GetMostNumerousEspecies)

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