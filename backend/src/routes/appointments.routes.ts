import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const findAppointmentInSameDate = appointmentsRepository.findByDate(date);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'An appointment for this exact time already exists' });
  }

  const appointment = appointmentsRepository.create({ provider, date });

  return response.json(appointment);
});

export default appointmentsRouter;
