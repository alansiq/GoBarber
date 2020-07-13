import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import 'reflect-metadata';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

// Global error middleware
app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    })
  }
  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  })

})

app.listen(3333, () => {
  console.log('Server is running @ :3333 🚀');
});
