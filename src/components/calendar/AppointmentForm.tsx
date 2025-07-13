import React, { useState, useEffect } from 'react';
import { useAppointments } from '@/contexts/AppointmentContext';
import { MOCK_DOCTORS, MOCK_PATIENTS, type Appointment } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar, CalendarIcon, Clock, User, UserCheck, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  appointment?: Appointment;
  mode: 'add' | 'edit' | 'view';
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  isOpen,
  onClose,
  selectedDate,
  appointment,
  mode
}) => {
  const { addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: selectedDate,
    time: '',
    notes: '',
    status: 'scheduled' as 'scheduled' | 'completed' | 'cancelled'
  });

  useEffect(() => {
    if (appointment && (mode === 'edit' || mode === 'view')) {
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes || '',
        status: appointment.status
      });
    } else {
      setFormData({
        patientId: '',
        doctorId: '',
        date: selectedDate,
        time: '',
        notes: '',
        status: 'scheduled'
      });
    }
  }, [appointment, selectedDate, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'add') {
      addAppointment(formData);
    } else if (mode === 'edit' && appointment) {
      updateAppointment(appointment.id, formData);
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (appointment && window.confirm('Are you sure you want to delete this appointment?')) {
      deleteAppointment(appointment.id);
      onClose();
    }
  };

  const selectedPatient = MOCK_PATIENTS.find(p => p.id === formData.patientId);
  const selectedDoctor = MOCK_DOCTORS.find(d => d.id === formData.doctorId);

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-accent text-accent-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'add' && (
              <>
                <Calendar className="w-5 h-5 text-primary" />
                Schedule New Appointment
              </>
            )}
            {mode === 'edit' && (
              <>
                <Calendar className="w-5 h-5 text-primary" />
                Edit Appointment
              </>
            )}
            {mode === 'view' && (
              <>
                <Calendar className="w-5 h-5 text-primary" />
                Appointment Details
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {mode === 'view' ? (
          <div className="space-y-4">
            <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{selectedPatient?.name}</h3>
                <Badge className={getStatusColor(formData.status)}>
                  {formData.status}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedPatient?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedDoctor?.name} - {selectedDoctor?.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  <span>{formatDate(formData.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{formatTime(formData.time)}</span>
                </div>
              </div>
              
              {formData.notes && (
                <div className="pt-2 border-t border-border">
                  <Label className="text-sm font-medium">Notes:</Label>
                  <p className="text-sm text-muted-foreground">{formData.notes}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => window.location.href = `tel:${selectedPatient?.phone}`}
                variant="outline" 
                className="flex-1"
              >
                Call Patient
              </Button>
              <Button 
                onClick={handleDelete}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, patientId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PATIENTS.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      <div className="flex flex-col">
                        <span>{patient.name}</span>
                        <span className="text-xs text-muted-foreground">{patient.phone}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                value={formData.doctorId}
                onValueChange={(value) => setFormData(prev => ({ ...prev, doctorId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_DOCTORS.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: doctor.color }}
                        />
                        <div className="flex flex-col">
                          <span>{doctor.name}</span>
                          <span className="text-xs text-muted-foreground">{doctor.specialty}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <TimePicker
                  value={formData.time}
                  onChange={(time) => setFormData(prev => ({ ...prev, time }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes about this appointment..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {mode === 'add' ? 'Schedule Appointment' : 'Update Appointment'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};