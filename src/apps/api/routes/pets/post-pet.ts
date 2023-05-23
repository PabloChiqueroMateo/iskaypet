import express, { Request, Router, Response } from "express";
import { body } from 'express-validator';
import { CreatePet } from "../../../contexts/application/create-pet.service";
import { Pet } from "../../../contexts/domain";
import container from "../../../../inversify.config";
const route = Router();

/**
 * @api {post} /user route for create a pet
 */

export default (app: Router) => {
    app.use('/createpet', route);
    app.use(express.json())
    /**
     * @swagger
     * tags:
     *   name: Pets
     *   description: API para gestionar mascotas
     */

    /**
     * @swagger
     * path:
     *  /createPet:
     *    post:
     *      summary: Crea una nueva mascota
     *      tags: [Pets]
     *      // Resto de la definición de la ruta...
     */
    route.post('',
        body('test').exists().isString(),

        async (req: Request, res: Response, next) => {
            try {
                const body: Pet = req.body;

                const createPet = container.get<CreatePet>(CreatePet);

                const response = await createPet.run(body);

                if (response) {
                    res.status(201).json(response)
                } else {
                    res.status(500).json(response)
                }

            } catch (error) {
                console.log(error);
                next(error)
            }
        }
    )
}