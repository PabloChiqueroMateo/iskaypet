import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './apps/api/routes';

const app = express();

app.use(express.json())

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/dev', routes());

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
