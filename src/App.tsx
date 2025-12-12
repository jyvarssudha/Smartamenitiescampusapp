import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { FacilityBooking } from './components/FacilityBooking';
import { MaintenanceRequests } from './components/MaintenanceRequests';
import { CampusDirectory } from './components/CampusDirectory';
import { Notifications } from './components/Notifications';
import { UserProfile } from './components/UserProfile';
import { Login } from './components/Login';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { PTStaffDashboard } from './components/PTStaffDashboard';
import { MaintenanceHeadDashboard } from './components/MaintenanceHeadDashboard';
import { Building2, Calendar, Wrench, Map, Bell, User, LogOut } from 'lucide-react';
import { Toaster } from 'sonner@2.0.3';

type UserRole = 'student' | 'teaching-staff' | 'non-teaching-staff' | 'maintenance-head';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
};

type View = 'dashboard' | 'booking' | 'maintenance' | 'directory' | 'notifications' | 'profile';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Booking Confirmed', message: 'Seminar Hall A booked for Dec 5', read: false },
    { id: '2', title: 'Maintenance Update', message: 'AC repair completed in Lab 201', read: false },
  ]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!currentUser) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Show Student Dashboard for students
  if (currentUser.role === 'student') {
    return (
      <>
        <StudentDashboard user={currentUser} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Show Teacher Dashboard for teaching staff
  if (currentUser.role === 'teaching-staff') {
    return (
      <>
        <TeacherDashboard user={currentUser} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Show PT Staff Dashboard for non-teaching staff
  if (currentUser.role === 'non-teaching-staff') {
    return (
      <>
        <PTStaffDashboard user={currentUser} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  // Show Maintenance Head Dashboard for maintenance head
  if (currentUser.role === 'maintenance-head') {
    return (
      <>
        <MaintenanceHeadDashboard user={currentUser} />
        <Toaster position="top-right" richColors />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Smart Campus</h1>
                <p className="text-sm text-slate-500">Amenities Hub</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavButton
              icon={<Building2 className="w-5 h-5" />}
              label="Dashboard"
              active={currentView === 'dashboard'}
              onClick={() => setCurrentView('dashboard')}
            />
            <NavButton
              icon={<Calendar className="w-5 h-5" />}
              label="Facility Booking"
              active={currentView === 'booking'}
              onClick={() => setCurrentView('booking')}
            />
            <NavButton
              icon={<Wrench className="w-5 h-5" />}
              label="Maintenance"
              active={currentView === 'maintenance'}
              onClick={() => setCurrentView('maintenance')}
            />
            <NavButton
              icon={<Map className="w-5 h-5" />}
              label="Campus Directory"
              active={currentView === 'directory'}
              onClick={() => setCurrentView('directory')}
            />
            <NavButton
              icon={<Bell className="w-5 h-5" />}
              label="Notifications"
              active={currentView === 'notifications'}
              badge={unreadCount}
              onClick={() => setCurrentView('notifications')}
            />
            <NavButton
              icon={<User className="w-5 h-5" />}
              label="Profile"
              active={currentView === 'profile'}
              onClick={() => setCurrentView('profile')}
            />
          </nav>

          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate capitalize">
                  {currentUser.role.replace('-', ' ')}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <Dashboard user={currentUser} />}
          {currentView === 'booking' && <FacilityBooking user={currentUser} />}
          {currentView === 'maintenance' && <MaintenanceRequests user={currentUser} />}
          {currentView === 'directory' && <CampusDirectory />}
          {currentView === 'notifications' && (
            <Notifications
              notifications={notifications}
              onMarkAsRead={(id) => {
                setNotifications(prev =>
                  prev.map(n => n.id === id ? { ...n, read: true } : n)
                );
              }}
            />
          )}
          {currentView === 'profile' && <UserProfile user={currentUser} />}
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

function NavButton({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active
          ? 'bg-blue-50 text-blue-700 shadow-sm'
          : 'text-slate-700 hover:bg-slate-100'
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}