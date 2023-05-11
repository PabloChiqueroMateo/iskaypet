import { Request, Router, Response } from "express";
import { GetPets } from "../../../../contexts/application";
import container from "../../inversify.config";

const route = Router();

/**
 * @api {get} / user route for get pets
 */

export default (app: Router) => {
    app.use('/pets', route);

    route.get('',
        async (req: Request, res: Response, next) => {
            try {
                const { id } = req.query;
                const getPets =  container.get<GetPets>(GetPets);
                const response = await getPets.run();
                console.log('ID', id);

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