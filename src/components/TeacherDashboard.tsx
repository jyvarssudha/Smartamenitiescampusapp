import { useState } from 'react';
import { BookOpen, Bell, Calendar, ArrowLeft, Plus, Clock, Users, MapPin, CheckCircle, XCircle, FileText, AlertCircle, Award, Trash2 } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type ClassInfo = {
  id: string;
  name: string;
  subject: string;
  section: string;
  year: string;
  semester: string;
  totalStudents: number;
};

type Assignment = {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  assignedBy: string;
  maxMarks: number;
  submissionType: string;
  className: string;
};

type StudentRequest = {
  id: string;
  studentName: string;
  studentId: string;
  date: string;
  time: string;
  subject: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: string;
};

type Event = {
  id: string;
  title: string;
  type: 'technical' | 'cultural' | 'sports' | 'workshop' | 'seminar' | 'fest' | 'fun';
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  registrationRequired: boolean;
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  prizes?: string;
  speaker?: string;
};

// Helper function to get next Saturday dates
const getNextSaturdays = () => {
  const saturdays = [];
  const today = new Date('2025-12-10'); // Current date
  let current = new Date(today);
  
  // Find next Saturday
  while (current.getDay() !== 6) {
    current.setDate(current.getDate() + 1);
  }
  
  // Get next 4 Saturdays
  for (let i = 0; i < 4; i++) {
    saturdays.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  
  return saturdays.map(d => d.toISOString().split('T')[0]);
};

const nextSaturdays = getNextSaturdays();

const events: Event[] = [
  // Saturday Fun Games
  {
    id: 'sat1',
    title: 'Saturday Fun Night - Quiz Master',
    type: 'fun',
    description: 'Test your knowledge in this fun-filled quiz night! Categories include general knowledge, movies, sports, technology, and pop culture. Form teams of 3-4 members and compete for exciting prizes. Snacks and refreshments will be provided.',
    date: nextSaturdays[0],
    time: '6:00 PM - 8:00 PM',
    venue: 'Seminar Hall',
    organizer: 'Student Activities Committee',
    registrationRequired: true,
    registrationDeadline: nextSaturdays[0],
    maxParticipants: 60,
    currentParticipants: 38,
    prizes: 'Winner: Gift Vouchers worth ₹3,000',
  },
  {
    id: 'sat2',
    title: 'Saturday Gaming Tournament - FIFA 2025',
    type: 'fun',
    description: 'Join us for an exciting FIFA gaming tournament! Bring your A-game and compete against fellow students in this virtual football championship. Single elimination format, with live commentary and big screen display. All skill levels welcome!',
    date: nextSaturdays[1],
    time: '4:00 PM - 7:00 PM',
    venue: 'Seminar Hall',
    organizer: 'Gaming Club',
    registrationRequired: true,
    registrationDeadline: nextSaturdays[1],
    maxParticipants: 32,
    currentParticipants: 24,
    prizes: '1st: Gaming Headset | 2nd: Game Bundle',
  },
  {
    id: 'sat3',
    title: 'Saturday Movie Night - Classic Cinema',
    type: 'fun',
    description: 'Relax and unwind with a classic movie screening! This week featuring a beloved film from the golden age of cinema. Free popcorn and soft drinks for all attendees. Perfect way to destress after a week of classes!',
    date: nextSaturdays[2],
    time: '7:00 PM - 10:00 PM',
    venue: 'Seminar Hall',
    organizer: 'Film & Arts Society',
    registrationRequired: false,
    maxParticipants: 100,
    currentParticipants: 67,
  },
  {
    id: 'sat4',
    title: 'Saturday Board Game Bonanza',
    type: 'fun',
    description: 'Discover the joy of classic and modern board games! Chess, Monopoly, Scrabble, Catan, and many more. Perfect for making new friends and having a great time. No experience needed - we will teach you the rules. Prizes for tournament winners!',
    date: nextSaturdays[3],
    time: '5:00 PM - 8:00 PM',
    venue: 'Seminar Hall',
    organizer: 'Student Welfare Committee',
    registrationRequired: false,
    maxParticipants: 80,
    currentParticipants: 52,
    prizes: 'Multiple category winners - Gift hampers',
  },
  {
    id: '1',
    title: 'TechFest 2025 - Annual Technical Symposium',
    type: 'technical',
    description: 'Join us for the biggest technical event of the year featuring coding competitions, hackathons, project exhibitions, and tech talks from industry experts.',
    date: '2025-12-15',
    time: '9:00 AM - 6:00 PM',
    venue: 'Main Auditorium & CS Labs',
    organizer: 'Computer Science Department',
    registrationRequired: true,
    registrationDeadline: '2025-12-10',
    maxParticipants: 500,
    currentParticipants: 342,
    prizes: 'Total Prize Pool: ₹1,50,000',
  },
  {
    id: '2',
    title: 'AI & Machine Learning Workshop',
    type: 'workshop',
    description: 'Hands-on workshop on Deep Learning and Neural Networks. Learn to build ML models using TensorFlow and PyTorch.',
    date: '2025-12-12',
    time: '10:00 AM - 4:00 PM',
    venue: 'Seminar Hall - Block A',
    organizer: 'AI Research Lab',
    registrationRequired: true,
    registrationDeadline: '2025-12-09',
    maxParticipants: 80,
    currentParticipants: 65,
    speaker: 'Dr. Anil Menon, Lead AI Researcher at Google',
  },
  {
    id: '3',
    title: 'Inter-College Basketball Championship',
    type: 'sports',
    description: 'Annual basketball tournament featuring teams from 12 colleges across the state.',
    date: '2025-12-18',
    time: '8:00 AM - 5:00 PM',
    venue: 'Indoor Stadium - Sports Complex',
    organizer: 'Sports Committee',
    registrationRequired: true,
    registrationDeadline: '2025-12-11',
    maxParticipants: 15,
    currentParticipants: 12,
    prizes: 'Winner: Trophy + ₹50,000 | Runner-up: ₹25,000',
  },
  {
    id: '4',
    title: 'Cultural Fest - "Expressions 2025"',
    type: 'cultural',
    description: 'Celebrate diversity and creativity with dance, music, drama, and art competitions.',
    date: '2025-12-22',
    time: '2:00 PM - 10:00 PM',
    venue: 'Open Air Theatre & Main Stage',
    organizer: 'Cultural Committee',
    registrationRequired: true,
    registrationDeadline: '2025-12-15',
    maxParticipants: 1000,
    currentParticipants: 687,
    prizes: 'Prizes in each category worth ₹2,00,000',
  },
  {
    id: '5',
    title: 'Entrepreneurship Summit 2025',
    type: 'seminar',
    description: 'Learn from successful entrepreneurs and industry leaders. Panel discussions on startup ecosystem.',
    date: '2025-12-14',
    time: '9:30 AM - 5:00 PM',
    venue: 'Convention Center',
    organizer: 'E-Cell & Incubation Center',
    registrationRequired: true,
    registrationDeadline: '2025-12-10',
    maxParticipants: 300,
    currentParticipants: 245,
    speaker: 'Panel of 5 successful entrepreneurs including unicorn founders',
  },
  {
    id: '6',
    title: 'Hackathon: Code for Change',
    type: 'technical',
    description: '24-hour hackathon focused on building solutions for social impact.',
    date: '2025-12-20',
    time: '8:00 AM (Dec 20) - 8:00 AM (Dec 21)',
    venue: 'Innovation Lab - CS Block',
    organizer: 'Tech Club & Social Service Cell',
    registrationRequired: true,
    registrationDeadline: '2025-12-16',
    maxParticipants: 200,
    currentParticipants: 156,
    prizes: '1st: ₹75,000 | 2nd: ₹50,000 | 3rd: ₹25,000',
  },
  {
    id: '7',
    title: 'Career Fair 2025',
    type: 'seminar',
    description: 'Meet recruiters from top companies including Google, Microsoft, Amazon, and 50+ organizations.',
    date: '2025-12-09',
    time: '10:00 AM - 5:00 PM',
    venue: 'Campus Grounds - Exhibition Area',
    organizer: 'Placement Cell',
    registrationRequired: false,
    maxParticipants: 2000,
    currentParticipants: 1523,
  },
  {
    id: '8',
    title: 'Annual Day Celebration',
    type: 'fest',
    description: 'Celebrate achievements with award ceremonies, cultural performances. Chief Guest: Dr. K. Sivan, Former Chairman ISRO.',
    date: '2025-12-28',
    time: '5:00 PM - 9:00 PM',
    venue: 'Main Auditorium Complex',
    organizer: 'College Administration',
    registrationRequired: false,
  },
];

// Teacher's classes
const teacherClasses: ClassInfo[] = [
  {
    id: '1',
    name: 'B.Tech CSE - Section A',
    subject: 'Data Structures',
    section: 'A',
    year: '2nd Year',
    semester: 'Semester 3',
    totalStudents: 58,
  },
  {
    id: '2',
    name: 'B.Tech CSE - Section B',
    subject: 'Data Structures',
    section: 'B',
    year: '2nd Year',
    semester: 'Semester 3',
    totalStudents: 60,
  },
  {
    id: '3',
    name: 'B.Tech CSE - Section C',
    subject: 'Object Oriented Programming',
    section: 'C',
    year: '2nd Year',
    semester: 'Semester 3',
    totalStudents: 55,
  },
];

// All assignments
const allAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    subject: 'Data Structures',
    description: 'Implement a Binary Search Tree with insert, delete, and search operations. Include in-order, pre-order, and post-order traversal methods.',
    assignedDate: '2025-12-01',
    dueDate: '2025-12-15',
    assignedBy: 'Dr. Ramesh Kumar',
    maxMarks: 50,
    submissionType: 'Code + Report',
    className: 'B.Tech CSE - Section A',
  },
  {
    id: '2',
    title: 'Linked List Operations',
    subject: 'Data Structures',
    description: 'Create a doubly linked list and implement various operations including insertion, deletion, reversal, and finding the middle element.',
    assignedDate: '2025-11-28',
    dueDate: '2025-12-12',
    assignedBy: 'Dr. Ramesh Kumar',
    maxMarks: 40,
    submissionType: 'Source Code',
    className: 'B.Tech CSE - Section B',
  },
  {
    id: '3',
    title: 'OOP Design Patterns',
    subject: 'Object Oriented Programming',
    description: 'Implement Singleton, Factory, and Observer design patterns with real-world examples. Document the use cases and advantages of each pattern.',
    assignedDate: '2025-12-03',
    dueDate: '2025-12-18',
    assignedBy: 'Dr. Ramesh Kumar',
    maxMarks: 60,
    submissionType: 'Code + Report',
    className: 'B.Tech CSE - Section C',
  },
];

// Student requests for doubt sessions
const studentRequests: StudentRequest[] = [
  {
    id: '1',
    studentName: 'Anjali Sharma',
    studentId: '21CS001',
    date: '2025-12-12',
    time: '3:00 PM - 4:00 PM',
    subject: 'Data Structures',
    description: 'I need help understanding the deletion operation in AVL trees, specifically how to perform rotations after deletion to maintain balance.',
    status: 'pending',
    requestedDate: '2025-12-09',
  },
  {
    id: '2',
    studentName: 'Vikram Patel',
    studentId: '21CS023',
    date: '2025-12-13',
    time: '2:00 PM - 3:00 PM',
    subject: 'Data Structures',
    description: 'Confused about the time complexity analysis of Graph traversal algorithms (BFS and DFS). Need clarification on the proof.',
    status: 'pending',
    requestedDate: '2025-12-08',
  },
  {
    id: '3',
    studentName: 'Priya Menon',
    studentId: '21CS045',
    date: '2025-12-11',
    time: '4:00 PM - 5:00 PM',
    subject: 'Object Oriented Programming',
    description: 'Need guidance on implementing the Observer pattern for the assignment. Having trouble with the notification mechanism.',
    status: 'approved',
    requestedDate: '2025-12-07',
  },
  {
    id: '4',
    studentName: 'Rahul Verma',
    studentId: '21CS067',
    date: '2025-12-10',
    time: '11:00 AM - 12:00 PM',
    subject: 'Data Structures',
    description: 'Question regarding heap implementation and how heapify works in both max heap and min heap.',
    status: 'rejected',
    requestedDate: '2025-12-06',
  },
];

type Section = 'main' | 'classroom' | 'notifications' | 'events' | 'class-detail';

export function TeacherDashboard({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [requests, setRequests] = useState(studentRequests);
  const [assignments, setAssignments] = useState(allAssignments);
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const pendingRequests = requests.filter(r => r.status === 'pending');

  const handleApproveRequest = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
  };

  const handleRejectRequest = (id: string) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
  };

  const handleAddAssignment = (newAssignment: Omit<Assignment, 'id' | 'assignedBy' | 'assignedDate'>) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: String(assignments.length + 1),
      assignedBy: user.name,
      assignedDate: new Date().toISOString().split('T')[0],
    };
    setAssignments([...assignments, assignment]);
    setShowAddAssignment(false);
  };

  const handleDeleteAssignment = (id: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  if (selectedEvent) {
    return (
      <EventDetailView 
        event={selectedEvent} 
        onBack={() => setSelectedEvent(null)} 
      />
    );
  }

  if (activeSection === 'class-detail' && selectedClass) {
    return (
      <ClassDetailView
        classInfo={selectedClass}
        user={user}
        assignments={assignments.filter(a => a.className === selectedClass.name)}
        onBack={() => {
          setActiveSection('classroom');
          setSelectedClass(null);
        }}
        onAddAssignment={() => setShowAddAssignment(true)}
        onDeleteAssignment={handleDeleteAssignment}
        showAddAssignment={showAddAssignment}
        onCloseAddAssignment={() => setShowAddAssignment(false)}
        onSubmitAssignment={handleAddAssignment}
      />
    );
  }

  if (activeSection === 'classroom') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">My Classes</h1>
            <p className="text-gray-600">Manage your classes, timetables, and assignments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherClasses.map((classInfo) => (
              <button
                key={classInfo.id}
                onClick={() => {
                  setSelectedClass(classInfo);
                  setActiveSection('class-detail');
                }}
                className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {classInfo.section}
                  </span>
                </div>

                <h3 className="text-gray-900 mb-2">{classInfo.subject}</h3>
                <p className="text-gray-600 mb-4">{classInfo.name}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>{classInfo.year}</span>
                    <span>{classInfo.semester}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{classInfo.totalStudents} Students</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-blue-600">Click to view details →</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'notifications') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Student Requests</h1>
            <p className="text-gray-600">Manage doubt session requests from students</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Pending Requests</p>
                <AlertCircle className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-3xl text-gray-900">{pendingRequests.length}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Approved</p>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl text-gray-900">
                {requests.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Rejected</p>
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-3xl text-gray-900">
                {requests.filter(r => r.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-gray-900 mb-4">Pending Requests</h2>
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Requests */}
          <div>
            <h2 className="text-gray-900 mb-4">All Requests</h2>
            <div className="space-y-4">
              {requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'events') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setActiveSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">College Events</h1>
            <p className="text-gray-600">Upcoming events and activities at PSG iTech</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Teacher Dashboard - {user.department}</p>
          <p className="text-sm text-gray-500 mt-1">Employee ID: {user.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Classroom"
            description="Manage classes, timetables, and assignments"
            color="blue"
            badge={`${teacherClasses.length} Classes`}
            onClick={() => setActiveSection('classroom')}
          />
          <DashboardCard
            icon={<Bell className="w-12 h-12" />}
            title="Notifications"
            description="View and respond to student requests"
            color="orange"
            badge={`${pendingRequests.length} Pending`}
            onClick={() => setActiveSection('notifications')}
            alert={pendingRequests.length > 0}
          />
          <DashboardCard
            icon={<Calendar className="w-12 h-12" />}
            title="Events"
            description="College events and activities"
            color="purple"
            badge={`${events.length} Events`}
            onClick={() => setActiveSection('events')}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatBox label="Total Students" value="173" color="blue" />
            <StatBox label="Active Assignments" value={String(assignments.length)} color="green" />
            <StatBox label="Pending Requests" value={String(pendingRequests.length)} color="orange" />
            <StatBox label="This Week's Classes" value="12" color="purple" />
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
  color: 'blue' | 'orange' | 'purple';
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
    purple: {
      bg: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      shadow: 'hover:shadow-purple-200',
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
  color: 'blue' | 'green' | 'orange' | 'purple';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}

function RequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: StudentRequest;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-gray-900">{request.studentName}</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
              {request.studentId}
            </span>
          </div>
          <p className="text-sm text-gray-600">Subject: {request.subject}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            request.status === 'pending'
              ? 'bg-orange-100 text-orange-700'
              : request.status === 'approved'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {request.status === 'pending' && '⏳ Pending'}
          {request.status === 'approved' && '✓ Approved'}
          {request.status === 'rejected' && '✗ Rejected'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Preferred Date: {new Date(request.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Time: {request.time}</span>
        </div>
        <div className="text-sm text-gray-500">
          Requested on: {new Date(request.requestedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="p-3 bg-gray-50 rounded-lg mb-4">
        <p className="text-sm text-gray-700">{request.description}</p>
      </div>

      {request.status === 'pending' && (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(request.id)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => onReject(request.id)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

function ClassDetailView({
  classInfo,
  user,
  assignments,
  onBack,
  onAddAssignment,
  onDeleteAssignment,
  showAddAssignment,
  onCloseAddAssignment,
  onSubmitAssignment,
}: {
  classInfo: ClassInfo;
  user: User;
  assignments: Assignment[];
  onBack: () => void;
  onAddAssignment: () => void;
  onDeleteAssignment: (id: string) => void;
  showAddAssignment: boolean;
  onCloseAddAssignment: () => void;
  onSubmitAssignment: (assignment: Omit<Assignment, 'id' | 'assignedBy' | 'assignedDate'>) => void;
}) {
  const timetable = {
    Monday: [
      { time: '9:00 AM - 10:00 AM', subject: classInfo.subject, room: 'CS-201' },
      { time: '11:00 AM - 12:00 PM', subject: classInfo.subject, room: 'CS-202' },
    ],
    Tuesday: [
      { time: '10:00 AM - 11:00 AM', subject: classInfo.subject, room: 'CS-203' },
      { time: '2:00 PM - 3:00 PM', subject: classInfo.subject, room: 'CS-201' },
    ],
    Wednesday: [{ time: '9:00 AM - 10:00 AM', subject: classInfo.subject, room: 'CS-202' }],
    Thursday: [
      { time: '11:00 AM - 12:00 PM', subject: classInfo.subject, room: 'CS-203' },
      { time: '3:00 PM - 4:00 PM', subject: classInfo.subject, room: 'CS-201' },
    ],
    Friday: [{ time: '10:00 AM - 11:00 AM', subject: classInfo.subject, room: 'CS-202' }],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Classes
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-gray-900 mb-2">{classInfo.subject}</h1>
              <p className="text-gray-600 mb-4">{classInfo.name}</p>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>{classInfo.year}</span>
                <span>•</span>
                <span>{classInfo.semester}</span>
                <span>•</span>
                <span>{classInfo.totalStudents} Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-gray-900 mb-6">Weekly Timetable</h2>
          <div className="space-y-4">
            {Object.entries(timetable).map(([day, slots]) => (
              <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-4 py-3">
                  <h3 className="text-gray-900">{day}</h3>
                </div>
                <div className="p-4">
                  {slots.length > 0 ? (
                    <div className="space-y-3">
                      {slots.map((slot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-600">{slot.time}</span>
                            <span className="text-gray-900">{slot.subject}</span>
                          </div>
                          <span className="text-sm text-gray-500">{slot.room}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No classes scheduled</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Assignments</h2>
            <button
              onClick={onAddAssignment}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Assignment
            </button>
          </div>

          {assignments.length > 0 ? (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">
                        Assigned by: {assignment.assignedBy} • {assignment.maxMarks} marks
                      </p>
                    </div>
                    {assignment.assignedBy === user.name && (
                      <button
                        onClick={() => onDeleteAssignment(assignment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete assignment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{assignment.submissionType}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No assignments yet. Click &quot;Add Assignment&quot; to create one.</p>
            </div>
          )}
        </div>
      </div>

      {showAddAssignment && (
        <AddAssignmentModal
          classInfo={classInfo}
          onClose={onCloseAddAssignment}
          onSubmit={onSubmitAssignment}
        />
      )}
    </div>
  );
}

function AddAssignmentModal({
  classInfo,
  onClose,
  onSubmit,
}: {
  classInfo: ClassInfo;
  onClose: () => void;
  onSubmit: (assignment: Omit<Assignment, 'id' | 'assignedBy' | 'assignedDate'>) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    subject: classInfo.subject,
    description: '',
    dueDate: '',
    maxMarks: '',
    submissionType: 'PDF Document',
    className: classInfo.name,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      maxMarks: parseInt(formData.maxMarks),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-gray-900 mb-6">Add New Assignment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Assignment Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Data Structures Assignment 1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe the assignment requirements..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Maximum Marks</label>
              <input
                type="number"
                required
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 50"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Submission Type</label>
            <select
              value={formData.submissionType}
              onChange={(e) => setFormData({ ...formData, submissionType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>PDF Document</option>
              <option>Source Code</option>
              <option>Code + Report</option>
              <option>GitHub Repository</option>
              <option>Document</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'technical':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'cultural':
        return { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' };
      case 'sports':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'workshop':
        return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'seminar':
        return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
      case 'fest':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'fun':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    }
  };

  const colors = getEventColor(event.type);

  return (
    <button
      onClick={onClick}
      className={`w-full p-5 border ${colors.border} rounded-lg hover:shadow-lg transition-all text-left ${colors.bg}`}
    >
      <span className={`inline-block px-2 py-1 bg-white rounded-full text-xs mb-2 ${colors.text} capitalize`}>
        {event.type}
      </span>
      <h3 className="text-gray-900 mb-2">{event.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
      </div>

      {event.prizes && (
        <div className="mt-3 p-2 bg-white rounded text-xs text-green-700 border border-green-200">
          🏆 {event.prizes}
        </div>
      )}
    </button>
  );
}

function EventDetailView({ event, onBack }: { event: Event; onBack: () => void }) {
  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'cultural':
        return 'bg-pink-50 border-pink-200 text-pink-700';
      case 'sports':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'workshop':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'seminar':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'fest':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'fun':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5" />
        Back to Events
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className={`p-8 ${getEventColor(event.type)}`}>
            <span className="inline-block px-3 py-1 bg-white rounded-full text-xs mb-2 capitalize">
              {event.type}
            </span>
            <h1 className="text-gray-900 mb-2">{event.title}</h1>
            <p className="text-gray-700">Organized by {event.organizer}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="text-gray-900">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-gray-900">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="text-gray-900">{event.venue}</p>
                </div>
              </div>

              {event.maxParticipants && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="text-gray-900">
                      {event.currentParticipants} / {event.maxParticipants} registered
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 mb-3">About the Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>

            {event.speaker && (
              <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-700 mb-1">Speaker</p>
                <p className="text-gray-900">{event.speaker}</p>
              </div>
            )}

            {event.prizes && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Prizes & Awards</p>
                <p className="text-gray-900">{event.prizes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}