import { isEqual, startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: string;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const parsedDate = startOfHour(parseISO(date));
    const appointment = new Appointment({ provider, date: parsedDate });

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: string): Appointment | null {
    const parsedDate = startOfHour(parseISO(date));
    const findAppointment = this.appointments.find(appointment =>
      isEqual(parsedDate, appointment.date),
    );

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
