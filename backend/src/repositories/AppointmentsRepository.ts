import Appointment from '../models/Appointment';
import { isEqual, startOfHour, parseISO } from 'date-fns';

class AppointmentsRepository {
    private appointments: Appointment[];



    constructor() {
        this.appointments = [];
    }

    public create(provider: string, date:Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }

    public parseDate(date: string): Date {
        
        const parsedDate: Date = startOfHour(parseISO(date));

        return parsedDate;

    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date))

        return findAppointment || null

    }

}

export default AppointmentsRepository;