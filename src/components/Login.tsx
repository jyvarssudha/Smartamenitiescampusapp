import { useState } from 'react';
import { Building2, GraduationCap, Users, Briefcase, Wrench } from 'lucide-react';
import { ForgotPassword } from './ForgotPassword';
import { toast } from 'sonner@2.0.3';
import { authenticateUser, validateRollNumber, isSupabaseConfigured } from '../lib/supabaseConfig';

type UserRole = 'student' | 'teaching-staff' | 'non-teaching-staff' | 'maintenance-head';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
};

export function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate student roll number starts with 7155
    if (selectedRole === 'student' && !validateRollNumber(credentials.id)) {
      toast.error('Invalid roll number. Roll number must start with 7155');
      setIsLoading(false);
      return;
    }

    try {
      // Try to authenticate with Supabase first
      const user = await authenticateUser(credentials.id, credentials.password, selectedRole!);
      
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onLogin(user);
      } else {
        // Fallback to demo mode if Supabase is not configured
        if (!isSupabaseConfigured()) {
          console.warn('Using demo mode - Supabase not configured');
          const demoUser: User = {
            id: credentials.id,
            name: selectedRole === 'student' ? 'Demo Student' : 
                  selectedRole === 'teaching-staff' ? 'Demo Teacher' :
                  selectedRole === 'non-teaching-staff' ? 'Demo Staff' : 'Demo Maintenance Head',
            email: `${credentials.id}@psgitech.ac.in`,
            role: selectedRole!,
            department: selectedRole === 'student' ? 'CSE' :
                        selectedRole === 'teaching-staff' ? 'CSE' :
                        selectedRole === 'non-teaching-staff' ? 'Administration' : 'Facilities',
          };
          toast.success('Demo mode: Login successful');
          onLogin(demoUser);
        } else {
          toast.error('Invalid credentials. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to demo mode
      const demoUser: User = {
        id: credentials.id,
        name: selectedRole === 'student' ? 'Demo Student' : 
              selectedRole === 'teaching-staff' ? 'Demo Teacher' :
              selectedRole === 'non-teaching-staff' ? 'Demo Staff' : 'Demo Maintenance Head',
        email: `${credentials.id}@psgitech.ac.in`,
        role: selectedRole!,
        department: selectedRole === 'student' ? 'CSE' :
                    selectedRole === 'teaching-staff' ? 'CSE' :
                    selectedRole === 'non-teaching-staff' ? 'Administration' : 'Facilities',
      };
      toast.warning('Using demo mode - Database not configured');
      onLogin(demoUser);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCredentials({ id: '', password: '' });
  };

  const handleBack = () => {
    setSelectedRole(null);
    setCredentials({ id: '', password: '' });
  };

  if (showForgotPassword && selectedRole) {
    return <ForgotPassword role={selectedRole} onBack={() => setShowForgotPassword(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">PSG iTech Smart Campus</h1>
          <p className="text-slate-600">Amenities Management System</p>
        </div>

        {!selectedRole ? (
          // Role Selection Screen
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-slate-900 mb-6 text-center">Select Your Role</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoleCard
                icon={<GraduationCap className="w-8 h-8" />}
                title="Student"
                description="Access facility bookings and services"
                onClick={() => handleRoleSelect('student')}
                color="blue"
              />
              <RoleCard
                icon={<Users className="w-8 h-8" />}
                title="Teaching Staff"
                description="Manage classes and facilities"
                onClick={() => handleRoleSelect('teaching-staff')}
                color="cyan"
              />
              <RoleCard
                icon={<Briefcase className="w-8 h-8" />}
                title="Non-Teaching Staff"
                description="Administrative access"
                onClick={() => handleRoleSelect('non-teaching-staff')}
                color="slate"
              />
              <RoleCard
                icon={<Wrench className="w-8 h-8" />}
                title="Maintenance Head"
                description="Manage maintenance requests"
                onClick={() => handleRoleSelect('maintenance-head')}
                color="indigo"
              />
            </div>
          </div>
        ) : (
          // Login Form based on selected role
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={handleBack}
              className="mb-6 text-slate-600 hover:text-slate-900 flex items-center gap-2 transition-colors"
            >
              ← Back to role selection
            </button>

            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-md ${
                selectedRole === 'student' ? 'bg-blue-100' :
                selectedRole === 'teaching-staff' ? 'bg-cyan-100' :
                selectedRole === 'non-teaching-staff' ? 'bg-slate-100' : 'bg-indigo-100'
              }`}>
                {selectedRole === 'student' && <GraduationCap className={`w-8 h-8 text-blue-700`} />}
                {selectedRole === 'teaching-staff' && <Users className={`w-8 h-8 text-cyan-700`} />}
                {selectedRole === 'non-teaching-staff' && <Briefcase className={`w-8 h-8 text-slate-700`} />}
                {selectedRole === 'maintenance-head' && <Wrench className={`w-8 h-8 text-indigo-700`} />}
              </div>
              <h2 className="text-slate-900 mb-2 capitalize">
                {selectedRole === 'student' ? 'Student Login' :
                 selectedRole === 'teaching-staff' ? 'Teaching Staff Login' :
                 selectedRole === 'non-teaching-staff' ? 'Non-Teaching Staff Login' : 'Maintenance Head Login'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label htmlFor="id" className="block text-sm text-slate-700 mb-2">
                  {selectedRole === 'student' ? 'Register Number' : 'Employee ID'}
                </label>
                <input
                  type="text"
                  id="id"
                  value={credentials.id}
                  onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder={selectedRole === 'student' ? 'Enter your register number' : 'Enter your employee ID'}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedRole === 'student' ? 'bg-blue-700 hover:bg-blue-800' :
                  selectedRole === 'teaching-staff' ? 'bg-cyan-700 hover:bg-cyan-800' :
                  selectedRole === 'non-teaching-staff' ? 'bg-slate-700 hover:bg-slate-800' : 'bg-indigo-700 hover:bg-indigo-800'
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  description,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  color: 'blue' | 'cyan' | 'slate' | 'indigo';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
    cyan: 'bg-cyan-100 text-cyan-700 group-hover:bg-cyan-200',
    slate: 'bg-slate-100 text-slate-700 group-hover:bg-slate-200',
    indigo: 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-200',
  };

  const borderClasses = {
    blue: 'hover:border-blue-300',
    cyan: 'hover:border-cyan-300',
    slate: 'hover:border-slate-300',
    indigo: 'hover:border-indigo-300',
  };

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 border-slate-200 ${borderClasses[color]} transition-all text-left group hover:shadow-lg`}
    >
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </button>
  );
}