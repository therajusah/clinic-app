import React, { useState } from 'react';
import { useAppointments } from '@/contexts/AppointmentContext';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, Plus, Clock, User, Calendar, Phone } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import { Badge } from '@/components/ui/badge';

interface MobileCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const MobileCalendar: React.FC<MobileCalendarProps> = ({
  selectedDate,
  onDateChange
}) => {
  const { getAppointmentsByDate } = useAppointments();
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');

  const appointments = getAppointmentsByDate(currentDate);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const currentDateObj = new Date(currentDate + 'T00:00:00');
    const newDate = new Date(currentDateObj);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    const newDateString = newDate.toISOString().split('T')[0];
    setCurrentDate(newDateString);
    onDateChange(newDateString);
  };

  const handleDateInputChange = (date: string) => {
    setCurrentDate(date);
    onDateChange(date);
  };

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setFormMode('view');
    setShowAppointmentForm(true);
  };

  const handleAddAppointment = () => {
    setFormMode('add');
    setSelectedAppointment(null);
    setShowAppointmentForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-accent/10 text-accent border-accent/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  return (
    <>
      <div className="space-y-4">
        {/* Date Navigation */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Select Date</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDay('prev')}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDay('next')}
                  className="h-8 w-8"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date-picker">Jump to Date</Label>
              <Input
                id="date-picker"
                type="date"
                value={currentDate}
                onChange={(e) => handleDateInputChange(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="text-center">
              <h3 className={`text-lg font-semibold ${isToday(currentDate) ? 'text-primary' : 'text-foreground'}`}>
                {formatDate(currentDate)}
                {isToday(currentDate) && (
                  <Badge className="ml-2" variant="default">Today</Badge>
                )}
              </h3>
            </div>
          </CardContent>
        </Card>

        {/* Appointments for Selected Date */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Appointments ({appointments.length})
              </CardTitle>
              <Button
                onClick={handleAddAppointment}
                size="sm"
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No appointments scheduled for this date</p>
                <Button
                  onClick={handleAddAppointment}
                  variant="outline"
                  className="mt-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule First Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => {
                    const patient = MOCK_PATIENTS.find(p => p.id === appointment.patientId);
                    const doctor = MOCK_DOCTORS.find(d => d.id === appointment.doctorId);
                    
                    return (
                      <div
                        key={appointment.id}
                        className={`
                          p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                          ${getStatusColor(appointment.status)}
                        `}
                        onClick={() => handleAppointmentClick(appointment)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold text-lg">
                              {formatTime(appointment.time)}
                            </span>
                          </div>
                          <Badge 
                            className={appointment.status === 'scheduled' ? 'bg-primary' : 
                                     appointment.status === 'completed' ? 'bg-accent' : 'bg-destructive'}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{patient?.name}</div>
                              <div className="text-sm text-muted-foreground">{patient?.phone}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: doctor?.color }}
                            />
                            <div>
                              <div className="font-medium">{doctor?.name}</div>
                              <div className="text-sm text-muted-foreground">{doctor?.specialty}</div>
                            </div>
                          </div>
                          
                          {appointment.notes && (
                            <div className="text-sm text-muted-foreground bg-background/50 p-2 rounded">
                              {appointment.notes}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `tel:${patient?.phone}`;
                            }}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(appointment);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AppointmentForm
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        selectedDate={currentDate}
        appointment={selectedAppointment}
        mode={formMode}
      />
    </>
  );
};