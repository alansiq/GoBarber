import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();




appointmentsRouter.post('/', (request, response) => {

    const { provider, date } = request.body;

    const parsedDate = appointmentsRepository.parseDate(date)
    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)
    
    if (findAppointmentInSameDate) {
        return response.status(400).json({error: 'An appointment for this exact time already exists'});
    }


    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment)
})

export default appointmentsRouter;