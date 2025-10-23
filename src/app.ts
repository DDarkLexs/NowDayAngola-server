
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
// Middleware global para capturar todos os erros
app.use(errorHandler);

export { app };
