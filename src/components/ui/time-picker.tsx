import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  placeholder = "Select time"
}) => {
  // Generate time slots from 8 AM to 6 PM in 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: timeString, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {timeSlots.map((slot) => (
          <SelectItem key={slot.value} value={slot.value}>
            {slot.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};