import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './apps/api/routes';
import { Container } from 'inversify';
import { PetsModule } from './apps/contexts/pets.module';

const app = express();

app.use(express.json())

const container = new Container();
container.load(new PetsModule());


app.use('/dev', routes(container));

// Error handling
app.use(async (err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message
        }
    })
})

export { app };