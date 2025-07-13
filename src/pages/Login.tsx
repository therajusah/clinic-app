import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Stethoscope, Users, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to the clinic system.",
        });
        navigate('/calendar');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('staff@clinic.com');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light via-background to-medical-green-light flex items-center justify-center p-4 relative">
      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 h-10 w-10"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
      
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
                <Stethoscope className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-accent-foreground" fill="currentColor" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ClinicCare</h1>
            <p className="text-muted-foreground">Appointment Management System</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to manage your clinic appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12"
              onClick={fillDemoCredentials}
            >
              <Users className="w-4 h-4 mr-2" />
              Use Demo Account
            </Button>
          </CardContent>
        </Card>

        {/* Demo info */}
        <Card className="bg-secondary/50 border-secondary">
          <CardContent className="pt-6 space-y-2">
            <h3 className="font-semibold text-sm">Demo Credentials:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Email:</strong> staff@clinic.com</p>
              <p><strong>Password:</strong> 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;