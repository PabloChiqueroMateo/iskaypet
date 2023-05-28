import { Request, Router, Response } from "express";
import { Container } from "inversify";
import { GetAverageAgeBySpecie } from "../../../contexts/application";
const route = Router();

/**
 * @api {get} / user route for get average age by specie
 */

export default (app: Router, container:Container) => {
    app.use('/species/average', route);

    route.get('',

        async (req: Request, res: Response, next) => {
            try {
                const specie = req.query.specie;
                const getAverageAgeSpecies = container.get<GetAverageAgeBySpecie>(GetAverageAgeBySpecie);

                const response = await getAverageAgeSpecies.run(specie as string);
                if(response) {
                    res.status(201).json(`The average age for ${specie} is: ${response.averageAge} and the Standard deviation is: ${response.standardDeviation}`);
                } else {
                    res.status(500).json(response)
                }
            } catch (error) {
                next(new Error(error as any))
            }
        }
    )
}

export { route };