import  'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import  'express-async-errors';

import indexRouter from './routes/index'
import uploadConfig from './config/upload';
import AppError from './errors/AppErro';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(indexRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        }); 
    }

    console.error(err.message);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log(' Server started on port 3333!');
});
