import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger'; 


const app = express();

app.use(express.json())
if (process.env.DEVELOPMENT == 'true') {
    app.use(cors())
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(routes());

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