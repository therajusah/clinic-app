// Mock data for the clinic appointment system

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  color: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    color: '#1e40af'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Pediatrics',
    color: '#059669'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatology',
    color: '#7c3aed'
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialty: 'Orthopedics',
    color: '#dc2626'
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    specialty: 'Neurology',
    color: '#ea580c'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    phone: '(555) 234-5678',
    email: 'maria.garcia@email.com'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    phone: '(555) 345-6789',
    email: 'robert.johnson@email.com'
  },
  {
    id: '4',
    name: 'Jennifer Wilson',
    phone: '(555) 456-7890',
    email: 'jennifer.wilson@email.com'
  },
  {
    id: '5',
    name: 'Michael Brown',
    phone: '(555) 567-8901',
    email: 'michael.brown@email.com'
  },
  {
    id: '6',
    name: 'Sarah Davis',
    phone: '(555) 678-9012',
    email: 'sarah.davis@email.com'
  },
  {
    id: '7',
    name: 'Christopher Miller',
    phone: '(555) 789-0123',
    email: 'christopher.miller@email.com'
  },
  {
    id: '8',
    name: 'Amanda Taylor',
    phone: '(555) 890-1234',
    email: 'amanda.taylor@email.com'
  }
];

// Mock credentials
export const MOCK_CREDENTIALS = {
  email: 'staff@clinic.com',
  password: '123456'
};

// Sample appointments for demonstration
export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '1',
    date: new Date().toISOString().split('T')[0], // Today
    time: '09:00',
    status: 'scheduled',
    notes: 'Annual checkup'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '2',
    date: new Date().toISOString().split('T')[0], // Today
    time: '10:30',
    status: 'scheduled',
    notes: 'Follow-up appointment'
  },
  {
    id: '3',
    patientId: '3',
    doctorId: '1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '14:00',
    status: 'scheduled',
    notes: 'Consultation'
  }
];