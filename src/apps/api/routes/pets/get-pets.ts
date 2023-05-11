import { Request, Router, Response } from "express";
import { GetPets, GetPetsByName } from "../../../../contexts/application";
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
                const name = req.query.name;
                const getPets = container.get<GetPets>(GetPets);
                const getPetsByName = container.get<GetPetsByName>(GetPetsByName)

                const response = name ? await getPetsByName.run(name as string) : await getPets.run();


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