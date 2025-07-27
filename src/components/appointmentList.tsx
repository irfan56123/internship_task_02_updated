import AppointmentCard from './appointmentCard';
import { appointments } from '@/data/appointments';

const AppointmentList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {appointments.map((apt) => (
        <AppointmentCard key={apt.id} {...apt} />
      ))}
    </div>
  );
};

export default AppointmentList;
