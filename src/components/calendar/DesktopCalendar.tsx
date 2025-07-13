import React, { useState } from 'react';
import { useAppointments } from '@/contexts/AppointmentContext';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus, Clock, User } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import { Badge } from '@/components/ui/badge';

interface DesktopCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DesktopCalendar: React.FC<DesktopCalendarProps> = ({
  selectedDate,
  onDateChange
}) => {
  const { getAppointmentsByDate } = useAppointments();
  const [currentDate, setCurrentDate] = useState(new Date(selectedDate || new Date()));
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formMode, setFormMode] = useState<'add' | 'edit' | 'view'>('add');

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(month - 1);
    } else {
      newDate.setMonth(month + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    const dateString = clickedDate.toISOString().split('T')[0];
    onDateChange(dateString);
    setFormMode('add');
    setSelectedAppointment(null);
    setShowAppointmentForm(true);
  };

  const handleAppointmentClick = (appointment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAppointment(appointment);
    setFormMode('view');
    setShowAppointmentForm(true);
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return selected.getDate() === day && 
           selected.getMonth() === month && 
           selected.getFullYear() === year;
  };

  const getDayAppointments = (day: number) => {
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return getAppointmentsByDate(dateString);
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-border/20" />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const appointments = getDayAppointments(day);
      const isCurrentDay = isToday(day);
      const isSelectedDay = isSelected(day);

      days.push(
        <div
          key={day}
          className={`
            h-24 border border-border/20 p-1 cursor-pointer hover:bg-secondary/50 transition-colors
            ${isCurrentDay ? 'bg-primary/10 border-primary/30' : ''}
            ${isSelectedDay ? 'bg-accent/20 border-accent' : ''}
          `}
          onClick={() => handleDayClick(day)}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
              <span className={`
                text-sm font-medium
                ${isCurrentDay ? 'text-primary font-bold' : 'text-foreground'}
              `}>
                {day}
              </span>
              {appointments.length > 0 && (
                <Badge variant="secondary" className="text-xs h-4 px-1">
                  {appointments.length}
                </Badge>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              {appointments.slice(0, 2).map((appointment) => {
                const patient = MOCK_PATIENTS.find(p => p.id === appointment.patientId);
                const doctor = MOCK_DOCTORS.find(d => d.id === appointment.doctorId);
                
                return (
                  <div
                    key={appointment.id}
                    className="mb-1 p-1 rounded text-xs bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                    onClick={(e) => handleAppointmentClick(appointment, e)}
                  >
                    <div className="flex items-center gap-1 text-primary font-medium">
                      <Clock className="w-2 h-2" />
                      <span>{formatTime(appointment.time)}</span>
                    </div>
                    <div className="truncate text-foreground">
                      {patient?.name}
                    </div>
                  </div>
                );
              })}
              {appointments.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{appointments.length - 2} more
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {monthNames[month]} {year}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
                className="h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => {
                  setFormMode('add');
                  setSelectedAppointment(null);
                  setShowAppointmentForm(true);
                }}
                className="ml-4"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="grid grid-cols-7">
            {/* Day headers */}
            {dayNames.map((dayName) => (
              <div
                key={dayName}
                className="h-10 flex items-center justify-center bg-muted/50 border border-border/20 font-medium text-sm"
              >
                {dayName}
              </div>
            ))}
            
            {/* Calendar days */}
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>

      <AppointmentForm
        isOpen={showAppointmentForm}
        onClose={() => setShowAppointmentForm(false)}
        selectedDate={selectedDate}
        appointment={selectedAppointment}
        mode={formMode}
      />
    </>
  );
};