import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, SAMPLE_APPOINTMENTS } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByDateRange: (startDate: string, endDate: string) => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const savedAppointments = localStorage.getItem('clinic-appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    } else {
      // Initialize with sample data
      setAppointments(SAMPLE_APPOINTMENTS);
      localStorage.setItem('clinic-appointments', JSON.stringify(SAMPLE_APPOINTMENTS));
    }
  }, []);

  // Save appointments to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem('clinic-appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been successfully added to the calendar.",
    });
  };

  const updateAppointment = (id: string, appointmentData: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(appointment =>
        appointment.id === id ? { ...appointment, ...appointmentData } : appointment
      )
    );
    toast({
      title: "Appointment Updated",
      description: "The appointment has been successfully updated.",
    });
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id));
    toast({
      title: "Appointment Cancelled",
      description: "The appointment has been successfully removed from the calendar.",
      variant: "destructive",
    });
  };

  const getAppointmentsByDate = (date: string): Appointment[] => {
    return appointments.filter(appointment => appointment.date === date);
  };

  const getAppointmentsByDateRange = (startDate: string, endDate: string): Appointment[] => {
    return appointments.filter(appointment => 
      appointment.date >= startDate && appointment.date <= endDate
    );
  };

  const value = {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAppointmentsByDateRange,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};