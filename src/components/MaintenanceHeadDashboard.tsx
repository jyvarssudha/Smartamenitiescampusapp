import { useState } from 'react';
import { Wrench, Calendar, ArrowLeft, Plus, AlertCircle, CheckCircle, Clock, XCircle, Trash2, Users, MapPin } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type Complaint = {
  id: string;
  studentName: string;
  studentId: string;
  location: string;
  category: 'electrical' | 'plumbing' | 'furniture' | 'cleaning' | 'ac' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  registeredDate: string;
  registeredBy: 'student-app' | 'in-person';
  resolvedDate?: string;
  assignedTo?: string;
};

type Booking = {
  id: string;
  bookedBy: string;
  bookedById: string;
  purpose: 'lecture' | 'event';
  eventName: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: number;
  requirements: string[];
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: string;
  notes?: string;
};

// Initial complaints data
const initialComplaints: Complaint[] = [
  {
    id: '1',
    studentName: 'Anjali Sharma',
    studentId: '21CS001',
    location: 'CS Lab 201',
    category: 'electrical',
    description: 'Two computer systems in the front row are not powering on. Checked the power cables and they seem fine.',
    priority: 'high',
    status: 'pending',
    registeredDate: '2025-12-10',
    registeredBy: 'student-app',
  },
  {
    id: '2',
    studentName: 'Vikram Patel',
    studentId: '21CS023',
    location: 'Library - 2nd Floor',
    category: 'ac',
    description: 'Air conditioning not working in the reading section. Temperature is uncomfortably high.',
    priority: 'medium',
    status: 'in-progress',
    registeredDate: '2025-12-09',
    registeredBy: 'in-person',
    assignedTo: 'Ravi Kumar - HVAC Team',
  },
  {
    id: '3',
    studentName: 'Priya Menon',
    studentId: '21CS045',
    location: 'Classroom 305',
    category: 'furniture',
    description: 'Three chairs have broken armrests and one desk is wobbling. Need replacement or repair.',
    priority: 'low',
    status: 'resolved',
    registeredDate: '2025-12-07',
    registeredBy: 'student-app',
    resolvedDate: '2025-12-09',
    assignedTo: 'Maintenance Team',
  },
  {
    id: '4',
    studentName: 'Rahul Verma',
    studentId: '21CS067',
    location: 'Boys Hostel - Block B',
    category: 'plumbing',
    description: 'Water leakage from the bathroom on the third floor. Water is seeping into the corridor.',
    priority: 'high',
    status: 'in-progress',
    registeredDate: '2025-12-10',
    registeredBy: 'in-person',
    assignedTo: 'Plumbing Team',
  },
];

// Initial bookings data
const initialBookings: Booking[] = [
  {
    id: '1',
    bookedBy: 'Dr. Ramesh Kumar',
    bookedById: 'EMP001',
    purpose: 'lecture',
    eventName: 'Advanced Data Structures - Special Lecture',
    date: '2025-12-15',
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    attendees: 60,
    requirements: ['Projector', 'Whiteboard', 'Microphone'],
    status: 'pending',
    requestedDate: '2025-12-09',
  },
  {
    id: '2',
    bookedBy: 'Cultural Committee',
    bookedById: 'STUDENT-COMM',
    purpose: 'event',
    eventName: 'Annual Day Practice Session',
    date: '2025-12-18',
    startTime: '3:00 PM',
    endTime: '6:00 PM',
    attendees: 45,
    requirements: ['Sound System', 'Stage Lights', 'Chairs'],
    status: 'approved',
    requestedDate: '2025-12-08',
    notes: 'Approved for rehearsal',
  },
  {
    id: '3',
    bookedBy: 'Prof. Meera Iyer',
    bookedById: 'EMP045',
    purpose: 'lecture',
    eventName: 'Machine Learning Workshop',
    date: '2025-12-12',
    startTime: '2:00 PM',
    endTime: '5:00 PM',
    attendees: 80,
    requirements: ['Projector', 'Audio System', 'AC'],
    status: 'approved',
    requestedDate: '2025-12-06',
  },
  {
    id: '4',
    bookedBy: 'Tech Club',
    bookedById: 'STUDENT-TECH',
    purpose: 'event',
    eventName: 'Hackathon Kickoff Ceremony',
    date: '2025-12-20',
    startTime: '9:00 AM',
    endTime: '11:00 AM',
    attendees: 150,
    requirements: ['Projector', 'Sound System', 'Tables', 'Chairs'],
    status: 'pending',
    requestedDate: '2025-12-10',
  },
];

type Section = 'main' | 'complaints' | 'bookings';

export function MaintenanceHeadDashboard({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const pendingComplaints = complaints.filter(c => c.status === 'pending');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const highPriorityComplaints = complaints.filter(c => c.priority === 'high' && c.status !== 'resolved');

  const handleUpdateComplaintStatus = (id: string, status: Complaint['status'], assignedTo?: string) => {
    setComplaints(complaints.map(c => 
      c.id === id 
        ? { 
            ...c, 
            status, 
            assignedTo: assignedTo || c.assignedTo,
            resolvedDate: status === 'resolved' ? new Date().toISOString().split('T')[0] : c.resolvedDate 
          } 
        : c
    ));
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status'], notes?: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status, notes: notes || b.notes } : b
    ));
  };

  const handleDeleteComplaint = (id: string) => {
    if (confirm('Are you sure you want to delete this complaint?')) {
      setComplaints(complaints.filter(c => c.id !== id));
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('Are you sure you want to delete this booking request?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  if (activeSection === 'complaints') {
    return (
      <ComplaintsView
        complaints={complaints}
        onBack={() => setActiveSection('main')}
        onUpdateStatus={handleUpdateComplaintStatus}
        onDelete={handleDeleteComplaint}
      />
    );
  }

  if (activeSection === 'bookings') {
    return (
      <BookingsView
        bookings={bookings}
        onBack={() => setActiveSection('main')}
        onUpdateStatus={handleUpdateBookingStatus}
        onDelete={handleDeleteBooking}
      />
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Maintenance Head Dashboard</p>
          <p className="text-sm text-gray-500 mt-1">Employee ID: {user.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            icon={<Wrench className="w-12 h-12" />}
            title="Complaints"
            description="View and manage student complaints"
            color="orange"
            badge={`${pendingComplaints.length} Pending`}
            onClick={() => setActiveSection('complaints')}
            alert={highPriorityComplaints.length > 0}
          />
          <DashboardCard
            icon={<Calendar className="w-12 h-12" />}
            title="Seminar Hall Bookings"
            description="Manage seminar hall booking requests"
            color="blue"
            badge={`${pendingBookings.length} Pending`}
            onClick={() => setActiveSection('bookings')}
            alert={pendingBookings.length > 0}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatBox label="Pending Complaints" value={String(pendingComplaints.length)} color="orange" />
            <StatBox label="High Priority" value={String(highPriorityComplaints.length)} color="red" />
            <StatBox label="Pending Bookings" value={String(pendingBookings.length)} color="blue" />
            <StatBox 
              label="Resolved Today" 
              value={String(complaints.filter(c => c.resolvedDate === new Date().toISOString().split('T')[0]).length)} 
              color="green" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  color,
  badge,
  onClick,
  alert,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'orange';
  badge: string;
  onClick: () => void;
  alert?: boolean;
}) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      shadow: 'hover:shadow-blue-200',
    },
    orange: {
      bg: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      shadow: 'hover:shadow-orange-200',
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl border border-gray-200 p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colors.shadow} group`}
    >
      {alert && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}

      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-10 rounded-bl-full transition-all group-hover:opacity-20`}></div>

      <div className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 relative z-10`}>
        <div className={colors.iconColor}>{icon}</div>
      </div>

      <h3 className="text-gray-900 mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 mb-4 relative z-10">{description}</p>

      <span className={`inline-block px-3 py-1 ${colors.iconBg} ${colors.iconColor} rounded-full text-sm relative z-10`}>
        {badge}
      </span>

      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className={`w-10 h-10 ${colors.bg} bg-gradient-to-br rounded-full flex items-center justify-center`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: 'blue' | 'green' | 'orange' | 'red';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}

function ComplaintsView({
  complaints,
  onBack,
  onUpdateStatus,
  onDelete,
}: {
  complaints: Complaint[];
  onBack: () => void;
  onUpdateStatus: (id: string, status: Complaint['status'], assignedTo?: string) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Student Complaints</h1>
          <p className="text-gray-600">Manage and resolve student maintenance complaints</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'in-progress', 'resolved'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
              <span className="ml-2 text-sm">
                ({status === 'all' 
                  ? complaints.length 
                  : complaints.filter(c => c.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))}
          {filteredComplaints.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No complaints found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ComplaintCard({
  complaint,
  onUpdateStatus,
  onDelete,
}: {
  complaint: Complaint;
  onUpdateStatus: (id: string, status: Complaint['status'], assignedTo?: string) => void;
  onDelete: (id: string) => void;
}) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignedTo, setAssignedTo] = useState(complaint.assignedTo || '');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-gray-900">{complaint.studentName}</h3>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                {complaint.studentId}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(complaint.priority)} uppercase`}>
                {complaint.priority}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{complaint.location}</span>
              </div>
              <span className="capitalize">{complaint.category}</span>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">
                {complaint.registeredBy === 'student-app' ? '📱 App' : '🏢 In-Person'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(complaint.status)} capitalize`}>
              {complaint.status.replace('-', ' ')}
            </span>
            <button
              onClick={() => onDelete(complaint.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete complaint"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <p className="text-sm text-gray-700">{complaint.description}</p>
        </div>

        {complaint.assignedTo && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="text-blue-700">
              <strong>Assigned to:</strong> {complaint.assignedTo}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Registered: {new Date(complaint.registeredDate).toLocaleDateString()}</span>
          {complaint.resolvedDate && (
            <span>Resolved: {new Date(complaint.resolvedDate).toLocaleDateString()}</span>
          )}
        </div>

        {complaint.status !== 'resolved' && complaint.status !== 'rejected' && (
          <div className="flex gap-3">
            {complaint.status === 'pending' && (
              <>
                <button
                  onClick={() => setShowAssignModal(true)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Assign & Start Progress
                </button>
                <button
                  onClick={() => onUpdateStatus(complaint.id, 'rejected')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </>
            )}
            {complaint.status === 'in-progress' && (
              <button
                onClick={() => onUpdateStatus(complaint.id, 'resolved')}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
            )}
          </div>
        )}
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Assign Complaint</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Assign To</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter team or person name"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(complaint.id, 'in-progress', assignedTo);
                  setShowAssignModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Assign & Start
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BookingsView({
  bookings,
  onBack,
  onUpdateStatus,
  onDelete,
}: {
  bookings: Booking[];
  onBack: () => void;
  onUpdateStatus: (id: string, status: Booking['status'], notes?: string) => void;
  onDelete: (id: string) => void;
}) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Seminar Hall Bookings</h1>
          <p className="text-gray-600">Manage booking requests for lectures and events</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status}
              <span className="ml-2 text-sm">
                ({status === 'all' 
                  ? bookings.length 
                  : bookings.filter(b => b.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))}
          {filteredBookings.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No bookings found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  onUpdateStatus,
  onDelete,
}: {
  booking: Booking;
  onUpdateStatus: (id: string, status: Booking['status'], notes?: string) => void;
  onDelete: (id: string) => void;
}) {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState(booking.notes || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-gray-900">{booking.eventName}</h3>
              <span className={`px-3 py-1 rounded text-xs uppercase ${
                booking.purpose === 'lecture' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {booking.purpose}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <span>{booking.bookedBy}</span>
              <span>•</span>
              <span>{booking.bookedById}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)} capitalize`}>
              {booking.status}
            </span>
            <button
              onClick={() => onDelete(booking.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete booking"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{booking.startTime} - {booking.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{booking.attendees} Attendees</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2"><strong>Requirements:</strong></p>
          <div className="flex flex-wrap gap-2">
            {booking.requirements.map((req, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {req}
              </span>
            ))}
          </div>
        </div>

        {booking.notes && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="text-blue-700">
              <strong>Notes:</strong> {booking.notes}
            </p>
          </div>
        )}

        <div className="text-sm text-gray-500 mb-4">
          Requested: {new Date(booking.requestedDate).toLocaleDateString()}
        </div>

        {booking.status === 'pending' && (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowNotesModal(true);
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => onUpdateStatus(booking.id, 'rejected')}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        )}
      </div>

      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Approve Booking</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Add any notes or instructions..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(booking.id, 'approved', notes);
                  setShowNotesModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
