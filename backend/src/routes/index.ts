import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();


routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);

export default routes;
