import { Calendar, Wrench, Building2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

export function Dashboard({ user }: { user: User }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600">Here's what's happening on campus today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Active Bookings"
          value="3"
          color="blue"
        />
        <StatCard
          icon={<Wrench className="w-6 h-6" />}
          label="Maintenance Requests"
          value="2"
          color="orange"
        />
        <StatCard
          icon={<Building2 className="w-6 h-6" />}
          label="Available Facilities"
          value="12"
          color="green"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6" />}
          label="Completed Tasks"
          value="8"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-3">
            <BookingItem
              facility="Seminar Hall A"
              date="Dec 5, 2025"
              time="10:00 AM - 12:00 PM"
              status="confirmed"
            />
            <BookingItem
              facility="Computer Lab 201"
              date="Dec 8, 2025"
              time="2:00 PM - 4:00 PM"
              status="confirmed"
            />
            <BookingItem
              facility="Sports Ground"
              date="Dec 10, 2025"
              time="4:00 PM - 6:00 PM"
              status="pending"
            />
          </div>
        </div>

        {/* Maintenance Updates */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Maintenance Updates</h2>
          <div className="space-y-3">
            <MaintenanceItem
              title="AC Repair - Lab 201"
              status="completed"
              date="Dec 1, 2025"
            />
            <MaintenanceItem
              title="Projector Installation - Room 305"
              status="in-progress"
              date="Dec 2, 2025"
            />
            <MaintenanceItem
              title="WiFi Issue - Library Wing"
              status="pending"
              date="Dec 3, 2025"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionButton label="Book Facility" icon={<Calendar className="w-5 h-5" />} />
            <ActionButton label="Report Issue" icon={<Wrench className="w-5 h-5" />} />
            <ActionButton label="View Directory" icon={<Building2 className="w-5 h-5" />} />
            <ActionButton label="Check Status" icon={<CheckCircle className="w-5 h-5" />} />
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Announcements</h2>
          <div className="space-y-4">
            <div className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <p className="text-gray-900 mb-1">Campus Maintenance Schedule</p>
              <p className="text-sm text-gray-600 mb-2">
                Regular maintenance scheduled for all AC units this weekend.
              </p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <p className="text-gray-900 mb-1">New Facility Added</p>
              <p className="text-sm text-gray-600 mb-2">
                Conference Room C is now available for booking.
              </p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'orange' | 'green' | 'purple';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}

function BookingItem({
  facility,
  date,
  time,
  status,
}: {
  facility: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {status === 'confirmed' ? (
          <CheckCircle className="w-5 h-5 text-blue-600" />
        ) : (
          <Clock className="w-5 h-5 text-orange-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900">{facility}</p>
        <p className="text-sm text-gray-600">{date} • {time}</p>
        <p className={`text-xs capitalize mt-1 ${
          status === 'confirmed' ? 'text-green-600' : 'text-orange-600'
        }`}>
          {status}
        </p>
      </div>
    </div>
  );
}

function MaintenanceItem({
  title,
  status,
  date,
}: {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}) {
  const statusConfig = {
    completed: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
    'in-progress': { color: 'text-blue-600', bg: 'bg-blue-100', icon: Clock },
    pending: { color: 'text-orange-600', bg: 'bg-orange-100', icon: AlertCircle },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{date}</p>
        <p className={`text-xs capitalize mt-1 ${config.color}`}>
          {status.replace('-', ' ')}
        </p>
      </div>
    </div>
  );
}

function ActionButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}
