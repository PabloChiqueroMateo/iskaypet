import { Request, Router, Response } from "express";
import { GetAverageAgeBySpecie } from "../../../contexts/application";
import container from "../../../../inversify.config";
const route = Router();

/**
 * @api {get} / user route for get average age by specie
 */

export default (app: Router) => {
    app.use('/species/average', route);

    route.get('',

        async (req: Request, res: Response, next) => {

            try {
                const specie = req.query.specie;
                const getAverageAgeSpecies = container.get<GetAverageAgeBySpecie>(GetAverageAgeBySpecie);

                const response = await getAverageAgeSpecies.run(specie as string);
                if(response) {
                    res.status(201).json(`The average age for ${specie} is: ${response.averageAge} and the Standar deviation is: ${response.standarDeviation}`);
                } else {
                    res.status(500).json(response)
                }
            } catch (error) {
                next(new Error(error as any))
            }
        }
    )
}