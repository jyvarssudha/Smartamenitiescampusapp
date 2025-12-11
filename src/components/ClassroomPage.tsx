import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, AlertCircle, CheckCircle, FileText, Users, Award, Mic, Coffee, GraduationCap, Trophy, Music, BookOpen, Gamepad2, Film } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type Assignment = {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  faculty: string;
  maxMarks: number;
  submissionType: string;
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

const assignments: Assignment[] = [
  {
    id: '1',
    title: 'Design and Analysis of Algorithms - Assignment 3',
    subject: 'Algorithms',
    description: 'Implement Dijkstra\'s algorithm and analyze time complexity. Submit code and documentation.',
    assignedDate: '2025-11-28',
    dueDate: '2025-12-10',
    status: 'pending',
    priority: 'high',
    faculty: 'Dr. Rajesh Kumar',
    maxMarks: 50,
    submissionType: 'Code + Report',
  },
  {
    id: '2',
    title: 'Database Management System - Lab Exercise',
    subject: 'DBMS',
    description: 'Create a normalized database schema for hospital management system with ER diagram.',
    assignedDate: '2025-11-30',
    dueDate: '2025-12-08',
    status: 'pending',
    priority: 'high',
    faculty: 'Dr. Priya Sharma',
    maxMarks: 30,
    submissionType: 'PDF Document',
  },
  {
    id: '3',
    title: 'Web Technologies - Project Milestone 2',
    subject: 'Web Tech',
    description: 'Develop a responsive e-commerce website frontend using React and Tailwind CSS.',
    assignedDate: '2025-11-25',
    dueDate: '2025-12-15',
    status: 'pending',
    priority: 'medium',
    faculty: 'Dr. Priya Sharma',
    maxMarks: 100,
    submissionType: 'GitHub Repository',
  },
  {
    id: '4',
    title: 'Operating Systems - Process Scheduling',
    subject: 'OS',
    description: 'Simulate Round Robin and Priority scheduling algorithms. Compare performance metrics.',
    assignedDate: '2025-11-20',
    dueDate: '2025-12-05',
    status: 'submitted',
    priority: 'medium',
    faculty: 'Prof. Arjun Patel',
    maxMarks: 40,
    submissionType: 'Source Code',
  },
  {
    id: '5',
    title: 'Computer Networks - Research Paper Review',
    subject: 'Networks',
    description: 'Write a detailed review of a recent research paper on SDN (Software Defined Networking).',
    assignedDate: '2025-12-01',
    dueDate: '2025-12-20',
    status: 'pending',
    priority: 'low',
    faculty: 'Prof. Arjun Patel',
    maxMarks: 25,
    submissionType: 'PDF Report',
  },
  {
    id: '6',
    title: 'Software Engineering - UML Diagrams',
    subject: 'Software Engg',
    description: 'Create complete UML diagrams (Use Case, Class, Sequence) for online banking system.',
    assignedDate: '2025-11-15',
    dueDate: '2025-12-03',
    status: 'overdue',
    priority: 'high',
    faculty: 'Dr. Priya Sharma',
    maxMarks: 35,
    submissionType: 'Document',
  },
];

// Helper function to get next Saturday dates
const getNextSaturdays = () => {
  const saturdays = [];
  const today = new Date('2025-12-10'); // Current date based on the context
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
    description: 'Join us for the biggest technical event of the year featuring coding competitions, hackathons, project exhibitions, and tech talks from industry experts. Multiple events including Web Design, App Development, Debugging, and Technical Quiz.',
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
    description: 'Hands-on workshop on Deep Learning and Neural Networks. Learn to build ML models using TensorFlow and PyTorch. Covers CNN, RNN, and practical applications in computer vision and NLP.',
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
    description: 'Annual basketball tournament featuring teams from 12 colleges across the state. Compete for the championship trophy and represent PSG iTech. Qualifier rounds followed by semi-finals and grand finale.',
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
    description: 'Celebrate diversity and creativity with dance, music, drama, and art competitions. Events include Classical Dance, Western Dance, Solo Singing, Band Performance, Street Play, and Fashion Show. Grand finale with celebrity performance.',
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
    description: 'Learn from successful entrepreneurs and industry leaders. Panel discussions on startup ecosystem, funding strategies, and innovation. Pitch your startup ideas to investors. Networking session with VCs and angel investors.',
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
    description: '24-hour hackathon focused on building solutions for social impact. Themes include Education, Healthcare, Environment, and Rural Development. Mentorship from industry experts. Free food, swag, and accommodation provided.',
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
    description: 'Meet recruiters from top companies including Google, Microsoft, Amazon, Infosys, TCS, and 50+ organizations. On-spot interviews, resume reviews, career counseling, and networking opportunities. Dress code: Formal.',
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
    description: 'Celebrate achievements and excellence with award ceremonies, cultural performances, and felicitation of toppers and achievers. Chief Guest: Renowned scientist Dr. K. Sivan, Former Chairman ISRO. Grand dinner and entertainment show.',
    date: '2025-12-28',
    time: '5:00 PM - 9:00 PM',
    venue: 'Main Auditorium Complex',
    organizer: 'College Administration',
    registrationRequired: false,
  },
];

export function ClassroomPage({ user, onBack }: { user: User; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'events'>('assignments');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const overdueAssignments = assignments.filter(a => a.status === 'overdue');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
  const registrationOpenEvents = upcomingEvents.filter(e => e.registrationRequired && 
    (!e.registrationDeadline || new Date(e.registrationDeadline) >= new Date()));

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'technical': return <GraduationCap className="w-5 h-5" />;
      case 'cultural': return <Music className="w-5 h-5" />;
      case 'sports': return <Trophy className="w-5 h-5" />;
      case 'workshop': return <BookOpen className="w-5 h-5" />;
      case 'seminar': return <Mic className="w-5 h-5" />;
      case 'fest': return <Award className="w-5 h-5" />;
      case 'fun': return <Gamepad2 className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'technical': return 'blue';
      case 'cultural': return 'pink';
      case 'sports': return 'green';
      case 'workshop': return 'purple';
      case 'seminar': return 'orange';
      case 'fest': return 'red';
      case 'fun': return 'yellow';
      default: return 'gray';
    }
  };

  const getDaysUntil = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (selectedEvent) {
    const eventColor = getEventColor(selectedEvent.type);
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      pink: 'bg-pink-50 border-pink-200 text-pink-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700',
      red: 'bg-red-50 border-red-200 text-red-700',
      gray: 'bg-gray-50 border-gray-200 text-gray-700',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    };

    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSelectedEvent(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Events
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Event Header */}
            <div className={`p-8 ${colorClasses[eventColor]}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                  {getEventIcon(selectedEvent.type)}
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs mb-2 capitalize">
                    {selectedEvent.type}
                  </span>
                  <h1 className="text-gray-900 mb-2">{selectedEvent.title}</h1>
                  <p className="text-gray-700">Organized by {selectedEvent.organizer}</p>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-gray-900">{formatDate(selectedEvent.date)}</p>
                    <p className="text-sm text-orange-600 mt-1">
                      {getDaysUntil(selectedEvent.date)} days from now
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-gray-900">{selectedEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Venue</p>
                    <p className="text-gray-900">{selectedEvent.venue}</p>
                  </div>
                </div>

                {selectedEvent.maxParticipants && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="text-gray-900">
                        {selectedEvent.currentParticipants} / {selectedEvent.maxParticipants} registered
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${((selectedEvent.currentParticipants || 0) / selectedEvent.maxParticipants) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-gray-900 mb-3">About the Event</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {selectedEvent.speaker && (
                <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-700 mb-1">Speaker</p>
                  <p className="text-gray-900">{selectedEvent.speaker}</p>
                </div>
              )}

              {selectedEvent.prizes && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 mb-1">Prizes & Awards</p>
                  <p className="text-gray-900">{selectedEvent.prizes}</p>
                </div>
              )}

              {selectedEvent.registrationRequired && selectedEvent.registrationDeadline && (
                <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700 mb-1">Registration Deadline</p>
                  <p className="text-gray-900">{formatDate(selectedEvent.registrationDeadline)}</p>
                </div>
              )}

              <div className="flex gap-4">
                {selectedEvent.registrationRequired ? (
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Register Now
                  </button>
                ) : (
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Mark as Interested
                  </button>
                )}
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Share Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedAssignment) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSelectedAssignment(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Assignments
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-gray-900 mb-2">{selectedAssignment.title}</h1>
                <p className="text-gray-600 mb-4">{selectedAssignment.subject}</p>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedAssignment.priority === 'high' 
                      ? 'bg-red-100 text-red-700'
                      : selectedAssignment.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedAssignment.priority.toUpperCase()} Priority
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedAssignment.status === 'submitted'
                      ? 'bg-green-100 text-green-700'
                      : selectedAssignment.status === 'overdue'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedAssignment.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Assigned By</p>
                <p className="text-gray-900">{selectedAssignment.faculty}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Maximum Marks</p>
                <p className="text-gray-900">{selectedAssignment.maxMarks} marks</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Assigned Date</p>
                <p className="text-gray-900">{formatDate(selectedAssignment.assignedDate)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Due Date</p>
                <p className="text-gray-900">{formatDate(selectedAssignment.dueDate)}</p>
                <p className="text-sm text-orange-600 mt-1">
                  {getDaysUntil(selectedAssignment.dueDate)} days remaining
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Submission Type</p>
                <p className="text-gray-900">{selectedAssignment.submissionType}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedAssignment.description}</p>
            </div>

            {selectedAssignment.status !== 'submitted' && (
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Submission
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
              </div>
            )}

            {selectedAssignment.status === 'submitted' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-green-900">Submitted Successfully</p>
                  <p className="text-sm text-green-700">Your assignment is under evaluation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Services
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Classroom Hub</h1>
          <p className="text-gray-600">Manage your assignments and stay updated with college events</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Pending Assignments</p>
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl text-gray-900">{pendingAssignments.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Overdue</p>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl text-gray-900">{overdueAssignments.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Submitted</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl text-gray-900">{submittedAssignments.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Upcoming Events</p>
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl text-gray-900">{upcomingEvents.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-xl border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex-1 px-6 py-4 ${
                activeTab === 'assignments'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                <span>Assignments ({assignments.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 px-6 py-4 ${
                activeTab === 'events'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Events ({events.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-xl border border-gray-200 border-t-0 p-6">
          {activeTab === 'assignments' ? (
            <div className="space-y-4">
              {overdueAssignments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-red-600 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Overdue Assignments
                  </h3>
                  <div className="space-y-3">
                    {overdueAssignments.map((assignment) => (
                      <AssignmentCard
                        key={assignment.id}
                        assignment={assignment}
                        onClick={() => setSelectedAssignment(assignment)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-gray-900 mb-3">Pending Assignments</h3>
                <div className="space-y-3">
                  {pendingAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onClick={() => setSelectedAssignment(assignment)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-gray-900 mb-3">Submitted Assignments</h3>
                <div className="space-y-3">
                  {submittedAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      onClick={() => setSelectedAssignment(assignment)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {registrationOpenEvents.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    Registration Open
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {registrationOpenEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => setSelectedEvent(event)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-gray-900 mb-4">All Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setSelectedEvent(event)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AssignmentCard({ assignment, onClick }: { assignment: Assignment; onClick: () => void }) {
  const getDaysUntil = (date: string) => {
    const today = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysUntil(assignment.dueDate);

  return (
    <button
      onClick={onClick}
      className="w-full p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-gray-900 mb-1">{assignment.title}</h4>
          <p className="text-sm text-gray-600">{assignment.subject} • {assignment.faculty}</p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs ${
            assignment.priority === 'high' 
              ? 'bg-red-100 text-red-700'
              : assignment.priority === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}>
            {assignment.priority.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            assignment.status === 'submitted'
              ? 'bg-green-100 text-green-700'
              : assignment.status === 'overdue'
              ? 'bg-red-100 text-red-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {assignment.status === 'submitted' && '✓ Submitted'}
            {assignment.status === 'overdue' && 'Overdue'}
            {assignment.status === 'pending' && 'Pending'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
        {assignment.status !== 'submitted' && (
          <div className={`flex items-center gap-1 ${
            daysRemaining < 0 ? 'text-red-600' : daysRemaining <= 2 ? 'text-orange-600' : 'text-gray-600'
          }`}>
            <Clock className="w-4 h-4" />
            <span>
              {daysRemaining < 0 
                ? `${Math.abs(daysRemaining)} days overdue`
                : `${daysRemaining} days left`
              }
            </span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4" />
          <span>{assignment.maxMarks} marks</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-500 line-clamp-2">{assignment.description}</p>
      </div>
    </button>
  );
}

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const getDaysUntil = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'technical': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'cultural': return { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' };
      case 'sports': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'workshop': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'seminar': return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
      case 'fest': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'fun': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    }
  };

  const getEventIcon = (type: Event['type']) => {
    switch (type) {
      case 'technical': return <GraduationCap className="w-5 h-5" />;
      case 'cultural': return <Music className="w-5 h-5" />;
      case 'sports': return <Trophy className="w-5 h-5" />;
      case 'workshop': return <BookOpen className="w-5 h-5" />;
      case 'seminar': return <Mic className="w-5 h-5" />;
      case 'fest': return <Award className="w-5 h-5" />;
      case 'fun': return <Gamepad2 className="w-5 h-5" />;
    }
  };

  const colors = getEventColor(event.type);
  const daysUntil = getDaysUntil(event.date);

  return (
    <button
      onClick={onClick}
      className={`w-full p-5 border ${colors.border} rounded-lg hover:shadow-lg transition-all text-left ${colors.bg}`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${colors.text}`}>
          {getEventIcon(event.type)}
        </div>
        <div className="flex-1">
          <span className={`inline-block px-2 py-1 bg-white rounded-full text-xs mb-2 ${colors.text} capitalize`}>
            {event.type}
          </span>
          <h4 className="text-gray-900 mb-1 line-clamp-2">{event.title}</h4>
          <p className="text-sm text-gray-600">{event.organizer}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className={`ml-auto px-2 py-1 rounded-full text-xs ${
            daysUntil <= 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{event.venue}</span>
        </div>
        {event.registrationRequired && event.registrationDeadline && (
          <div className="flex items-center gap-2 text-orange-600">
            <AlertCircle className="w-4 h-4" />
            <span>Registration closes {new Date(event.registrationDeadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.description}</p>

      {event.prizes && (
        <div className="p-2 bg-white rounded text-xs text-green-700 border border-green-200">
          🏆 {event.prizes}
        </div>
      )}

      {event.maxParticipants && event.currentParticipants && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>{event.currentParticipants} registered</span>
            <span>{event.maxParticipants} max</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </button>
  );
}