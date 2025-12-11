import { useState } from 'react';
import { Building2, GraduationCap, Users, Briefcase, Wrench } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - in real app, this would validate against a database
    const demoUser: User = {
      id: credentials.id,
      name: selectedRole === 'student' ? 'Demo Student' : 
            selectedRole === 'teaching-staff' ? 'Demo Teacher' :
            selectedRole === 'non-teaching-staff' ? 'Demo Staff' : 'Demo Maintenance Head',
      email: `${credentials.id}@campus.edu`,
      role: selectedRole!,
      department: selectedRole === 'student' ? 'Engineering' :
                  selectedRole === 'teaching-staff' ? 'Computer Science' :
                  selectedRole === 'non-teaching-staff' ? 'Administration' : 'Facilities',
    };
    onLogin(demoUser);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCredentials({ id: '', password: '' });
  };

  const handleBack = () => {
    setSelectedRole(null);
    setCredentials({ id: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Smart Campus</h1>
          <p className="text-gray-600">Amenities Management System</p>
        </div>

        {!selectedRole ? (
          // Role Selection Screen
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-gray-900 mb-6 text-center">Select Your Role</h2>
            
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
                color="green"
              />
              <RoleCard
                icon={<Briefcase className="w-8 h-8" />}
                title="Non-Teaching Staff"
                description="Administrative access"
                onClick={() => handleRoleSelect('non-teaching-staff')}
                color="purple"
              />
              <RoleCard
                icon={<Wrench className="w-8 h-8" />}
                title="Maintenance Head"
                description="Manage maintenance requests"
                onClick={() => handleRoleSelect('maintenance-head')}
                color="orange"
              />
            </div>
          </div>
        ) : (
          // Login Form based on selected role
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <button
              onClick={handleBack}
              className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              ← Back to role selection
            </button>

            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                selectedRole === 'student' ? 'bg-blue-100' :
                selectedRole === 'teaching-staff' ? 'bg-green-100' :
                selectedRole === 'non-teaching-staff' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                {selectedRole === 'student' && <GraduationCap className={`w-8 h-8 text-blue-600`} />}
                {selectedRole === 'teaching-staff' && <Users className={`w-8 h-8 text-green-600`} />}
                {selectedRole === 'non-teaching-staff' && <Briefcase className={`w-8 h-8 text-purple-600`} />}
                {selectedRole === 'maintenance-head' && <Wrench className={`w-8 h-8 text-orange-600`} />}
              </div>
              <h2 className="text-gray-900 mb-2 capitalize">
                {selectedRole === 'student' ? 'Student Login' :
                 selectedRole === 'teaching-staff' ? 'Teaching Staff Login' :
                 selectedRole === 'non-teaching-staff' ? 'Non-Teaching Staff Login' : 'Maintenance Head Login'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label htmlFor="id" className="block text-sm text-gray-700 mb-2">
                  {selectedRole === 'student' ? 'Register Number' : 'Employee ID'}
                </label>
                <input
                  type="text"
                  id="id"
                  value={credentials.id}
                  onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={selectedRole === 'student' ? 'Enter your register number' : 'Enter your employee ID'}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white transition-colors ${
                  selectedRole === 'student' ? 'bg-blue-600 hover:bg-blue-700' :
                  selectedRole === 'teaching-staff' ? 'bg-green-600 hover:bg-green-700' :
                  selectedRole === 'non-teaching-staff' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
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
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
  };

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 border-gray-200 hover:border-${color}-300 transition-all text-left group hover:shadow-lg`}
    >
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}