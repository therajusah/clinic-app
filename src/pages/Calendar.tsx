import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/contexts/ThemeContext';
import { DesktopCalendar } from '@/components/calendar/DesktopCalendar';
import { MobileCalendar } from '@/components/calendar/MobileCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Stethoscope, Users, Calendar as CalendarIcon, TrendingUp, Sun, Moon } from 'lucide-react';
import { useAppointments } from '@/contexts/AppointmentContext';

const Calendar = () => {
  const { logout, user } = useAuth();
  const { appointments } = useAppointments();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => apt.date === today);
  const upcomingAppointments = appointments.filter(apt => apt.date > today);
  const totalPatients = new Set(appointments.map(apt => apt.patientId)).size;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light/30 via-background to-medical-green-light/30">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ClinicCare</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className="h-8 w-8"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                {!isMobile && "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Statistics Cards - Desktop: Sidebar, Mobile: Top */}
          <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-1 space-y-4`}>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{todayAppointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  {todayAppointments.filter(apt => apt.status === 'scheduled').length} scheduled
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">{upcomingAppointments.length}</div>
                <p className="text-xs text-muted-foreground">
                  Next 30 days
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/50 to-secondary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPatients}</div>
                <p className="text-xs text-muted-foreground">
                  Active patients
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Scheduled</span>
                  <Badge variant="default" className="bg-primary">
                    {appointments.filter(apt => apt.status === 'scheduled').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed</span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {appointments.filter(apt => apt.status === 'completed').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cancelled</span>
                  <Badge variant="destructive">
                    {appointments.filter(apt => apt.status === 'cancelled').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar - Main Content */}
          <div className={`${isMobile ? 'order-2' : 'order-1'} lg:col-span-3`}>
            {isMobile ? (
              <MobileCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            ) : (
              <DesktopCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;