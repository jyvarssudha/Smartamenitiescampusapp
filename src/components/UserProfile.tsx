import { User, Mail, Building2, Briefcase, Phone, MapPin, Edit } from 'lucide-react';

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

export function UserProfile({ user }: { user: UserType }) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="max-w-3xl">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 capitalize mb-4">{user.role.replace('-', ' ')}</p>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField
              icon={<Mail className="w-5 h-5" />}
              label="Email"
              value={user.email}
            />
            <InfoField
              icon={<Briefcase className="w-5 h-5" />}
              label="Role"
              value={user.role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            />
            <InfoField
              icon={<Building2 className="w-5 h-5" />}
              label="Department"
              value={user.department}
            />
            <InfoField
              icon={<Phone className="w-5 h-5" />}
              label="Phone"
              value="+1 (555) 0123"
            />
            <InfoField
              icon={<MapPin className="w-5 h-5" />}
              label="Office Location"
              value="Main Building, Room 304"
            />
          </div>
        </div>

        {/* Activity Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Activity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
              <p className="text-blue-600">12</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Maintenance Requests</p>
              <p className="text-orange-600">5</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Completed Tasks</p>
              <p className="text-green-600">8</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Settings</h3>
          <div className="space-y-4">
            <SettingToggle
              label="Email Notifications"
              description="Receive email updates about your bookings and requests"
              defaultChecked
            />
            <SettingToggle
              label="SMS Notifications"
              description="Get text messages for urgent updates"
              defaultChecked={false}
            />
            <SettingToggle
              label="Booking Reminders"
              description="Receive reminders before your scheduled bookings"
              defaultChecked
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SettingToggle({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <label className="relative inline-block w-12 h-6 ml-4 flex-shrink-0">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <span className="absolute inset-0 bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-600 transition-colors"></span>
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
      </label>
    </div>
  );
}
