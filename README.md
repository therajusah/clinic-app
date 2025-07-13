# ClinicCare - Appointment Management System

A modern, responsive appointment calendar application designed for clinic and hospital staff to manage doctor appointments efficiently. Built with React, TypeScript, and Tailwind CSS.

![ClinicCare Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.11-38B2AC)

## 🏥 Features

### 🔐 Authentication
- **Mock Authentication System** with hardcoded credentials
- **Email/Password Login** with form validation
- **Password Visibility Toggle** with eye icon
- **Protected Routes** - redirects to login if not authenticated
- **Demo Credentials**: `staff@clinic.com` / `123456`

### 🌙 Theme System
- **Dark/Light Mode Toggle** with persistent preferences
- **System Preference Detection** - automatically detects user's OS theme
- **Theme Persistence** - remembers user's choice across sessions
- **Visual Theme Indicators** - Sun/Moon icons for clear feedback
- **Responsive Theme Toggle** - accessible on all screen sizes

### 📅 Calendar Management
- **Responsive Design** - optimized for both desktop and mobile
- **Desktop View**: Full month calendar with appointment previews
- **Mobile View**: Single day view with date picker navigation
- **Real-time Updates** with localStorage persistence
- **Appointment Status Tracking** (Scheduled, Completed, Cancelled)

### 👥 Appointment Features
- **Add/Edit/Delete** appointments with comprehensive forms
- **Patient & Doctor Selection** from predefined lists
- **Time Picker** for precise scheduling
- **Notes & Status Management**
- **Visual Status Indicators** with color-coded badges

### 📊 Dashboard & Analytics
- **Today's Appointments** counter
- **Upcoming Appointments** tracking
- **Total Patients** statistics
- **Quick Status Overview** with appointment counts
- **Real-time Statistics** updates

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** with TypeScript
- **Vite** for fast development and building
- **React Router DOM** for navigation
- **React Hook Form** with Zod validation
- **TanStack Query** for data management

### UI/UX
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Lucide React** for icons
- **Shadcn/ui** component library
- **Responsive Design** with mobile-first approach

### State Management
- **React Context API** for global state
- **localStorage** for data persistence
- **Custom Hooks** for reusable logic
- **Theme Context** for dark/light mode management

## 📁 Project Structure

```
src/
├── components/
│   ├── calendar/
│   │   ├── AppointmentForm.tsx    # Appointment creation/editing
│   │   ├── DesktopCalendar.tsx    # Desktop month view
│   │   └── MobileCalendar.tsx     # Mobile single day view
│   └── ui/                        # Reusable UI components
├── contexts/
│   ├── AuthContext.tsx            # Authentication state
│   ├── AppointmentContext.tsx     # Appointment management
│   └── ThemeContext.tsx           # Dark/light mode state
├── data/
│   └── mockData.ts               # Sample data & interfaces
├── hooks/
│   └── use-mobile.ts             # Responsive utilities
├── pages/
│   ├── Login.tsx                 # Authentication page
│   ├── Calendar.tsx              # Main dashboard
│   └── NotFound.tsx              # 404 page
└── lib/                          # Utility functions
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clinic-time-organizer-app-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## 🎯 Core Functionality

### Authentication Flow
1. **Login Page**: Email/password form with validation
2. **Demo Credentials**: Pre-filled for quick testing
3. **Protected Routes**: Automatic redirects based on auth status
4. **Session Management**: Context-based state management

### Theme Management
1. **System Detection**: Automatically detects OS theme preference
2. **User Preference**: Toggle between light and dark modes
3. **Persistent Storage**: Theme choice saved in localStorage
4. **Visual Feedback**: Sun/Moon icons indicate current theme
5. **Global Access**: Theme toggle available on all pages

### Calendar Views

#### Desktop Experience
- **Month View**: Full calendar grid showing current month
- **Appointment Previews**: Patient names and times in each day cell
- **Navigation**: Previous/next month buttons
- **Quick Add**: Plus button for new appointments
- **Interactive Days**: Click to add appointments

#### Mobile Experience
- **Single Day View**: Focused on one day at a time
- **Date Picker**: Jump to any date quickly
- **Swipe Navigation**: Previous/next day buttons
- **Appointment List**: Detailed view of day's appointments
- **Touch-Optimized**: Larger touch targets

### Appointment Management
- **Form Validation**: Required fields and data validation
- **Patient Selection**: Dropdown with 8 sample patients
- **Doctor Selection**: Dropdown with 5 sample doctors
- **Time Picker**: Precise time selection
- **Status Updates**: Mark as scheduled/completed/cancelled
- **Notes Field**: Additional appointment details

### Data Persistence
- **localStorage**: All data persists between sessions
- **Real-time Updates**: Changes reflect immediately
- **Sample Data**: Pre-loaded with demo appointments
- **Data Export**: Easy to extend for API integration

## 🎨 Design System

### Color Palette
- **Primary**: Medical blue (#1e40af)
- **Secondary**: Medical green (#059669)
- **Accent**: Purple (#7c3aed)
- **Destructive**: Red (#dc2626)
- **Muted**: Gray tones for subtle elements

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable sans-serif
- **Labels**: Consistent form labeling
- **Status Text**: Color-coded for clarity

### Components
- **Cards**: Clean, elevated containers
- **Buttons**: Consistent styling with variants
- **Forms**: Accessible input components
- **Badges**: Status and count indicators
- **Modals**: Appointment forms and dialogs

## 📱 Responsive Features

### Mobile Optimizations
- **Touch-Friendly**: Large buttons and touch targets
- **Simplified Navigation**: Single day focus
- **Optimized Forms**: Full-screen appointment forms
- **Gesture Support**: Swipe navigation ready

### Desktop Enhancements
- **Full Calendar View**: Month overview
- **Multi-Appointment Display**: Compact appointment previews
- **Keyboard Navigation**: Full keyboard accessibility
- **Hover States**: Interactive feedback

## 🔧 Customization

### Adding New Patients/Doctors
Edit `src/data/mockData.ts`:
```typescript
export const MOCK_PATIENTS: Patient[] = [
  // Add new patients here
];

export const MOCK_DOCTORS: Doctor[] = [
  // Add new doctors here
];
```

### Styling Customization
- **Tailwind Config**: `tailwind.config.ts`
- **CSS Variables**: `src/index.css`
- **Component Themes**: Individual component files

### Feature Extensions
- **API Integration**: Replace localStorage with backend calls
- **Real-time Updates**: Add WebSocket support
- **Advanced Filtering**: Add search and filter capabilities
- **Export Features**: PDF/Excel appointment reports

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login with demo credentials
- [ ] Add new appointment
- [ ] Edit existing appointment
- [ ] Delete appointment
- [ ] Navigate between months (desktop)
- [ ] Navigate between days (mobile)
- [ ] Responsive design on different screen sizes
- [ ] Data persistence after page refresh
- [ ] Dark/light mode toggle functionality
- [ ] Theme persistence across page refreshes
- [ ] System theme preference detection

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Install dependencies: `npm install`
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables: None required

### Other Platforms
- **Firebase Hosting**: Compatible
- **AWS S3**: Static hosting
- **GitHub Pages**: Requires base path configuration

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent formatting
- **Component Structure**: Functional components with hooks

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Lucide** for beautiful icons
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for healthcare professionals**
