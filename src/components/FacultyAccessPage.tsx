import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Mail, Phone, Calendar } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type Faculty = {
  id: string;
  name: string;
  department: string;
  cabin: string;
  subjects: string[];
  email: string;
  phone: string;
  timetable: {
    [key: string]: { time: string; subject: string; room: string }[];
  };
};

const facultyData: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science',
    cabin: 'CS Block - 301',
    subjects: ['Data Structures', 'Algorithms', 'Theory of Computation'],
    email: 'rajesh.kumar@psgitech.ac.in',
    phone: '+91 98765 43210',
    timetable: {
      Monday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Data Structures', room: 'CS-201' },
        { time: '11:00 AM - 12:00 PM', subject: 'Algorithms', room: 'CS-202' },
      ],
      Tuesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Theory of Computation', room: 'CS-203' },
        { time: '2:00 PM - 3:00 PM', subject: 'Data Structures', room: 'CS-201' },
      ],
      Wednesday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Algorithms', room: 'CS-202' },
      ],
      Thursday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Theory of Computation', room: 'CS-203' },
        { time: '3:00 PM - 4:00 PM', subject: 'Data Structures', room: 'CS-201' },
      ],
      Friday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Algorithms', room: 'CS-202' },
      ],
    },
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    department: 'Computer Science',
    cabin: 'CS Block - 305',
    subjects: ['Database Management', 'Software Engineering', 'Web Technologies'],
    email: 'priya.sharma@psgitech.ac.in',
    phone: '+91 98765 43211',
    timetable: {
      Monday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Database Management', room: 'CS-204' },
        { time: '2:00 PM - 3:00 PM', subject: 'Software Engineering', room: 'CS-205' },
      ],
      Tuesday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Web Technologies', room: 'Lab-1' },
        { time: '11:00 AM - 12:00 PM', subject: 'Database Management', room: 'CS-204' },
      ],
      Wednesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Software Engineering', room: 'CS-205' },
        { time: '3:00 PM - 4:00 PM', subject: 'Web Technologies', room: 'Lab-1' },
      ],
      Thursday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Database Management', room: 'CS-204' },
      ],
      Friday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Software Engineering', room: 'CS-205' },
        { time: '2:00 PM - 3:00 PM', subject: 'Web Technologies', room: 'Lab-1' },
      ],
    },
  },
  {
    id: '3',
    name: 'Prof. Arjun Patel',
    department: 'Computer Science',
    cabin: 'CS Block - 308',
    subjects: ['Operating Systems', 'Computer Networks', 'Cloud Computing'],
    email: 'arjun.patel@psgitech.ac.in',
    phone: '+91 98765 43212',
    timetable: {
      Monday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Operating Systems', room: 'CS-206' },
        { time: '3:00 PM - 4:00 PM', subject: 'Computer Networks', room: 'CS-207' },
      ],
      Tuesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Cloud Computing', room: 'CS-208' },
      ],
      Wednesday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Computer Networks', room: 'CS-207' },
        { time: '2:00 PM - 3:00 PM', subject: 'Operating Systems', room: 'CS-206' },
      ],
      Thursday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Cloud Computing', room: 'CS-208' },
        { time: '2:00 PM - 3:00 PM', subject: 'Computer Networks', room: 'CS-207' },
      ],
      Friday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Operating Systems', room: 'CS-206' },
      ],
    },
  },
  {
    id: '4',
    name: 'Dr. Meena Krishnan',
    department: 'Electronics',
    cabin: 'EC Block - 201',
    subjects: ['Digital Electronics', 'Microprocessors', 'VLSI Design'],
    email: 'meena.k@psgitech.ac.in',
    phone: '+91 98765 43213',
    timetable: {
      Monday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Digital Electronics', room: 'EC-101' },
        { time: '11:00 AM - 12:00 PM', subject: 'Microprocessors', room: 'EC-102' },
      ],
      Tuesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'VLSI Design', room: 'EC-103' },
        { time: '2:00 PM - 3:00 PM', subject: 'Digital Electronics', room: 'EC-101' },
      ],
      Wednesday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Microprocessors', room: 'EC-102' },
      ],
      Thursday: [
        { time: '11:00 AM - 12:00 PM', subject: 'VLSI Design', room: 'EC-103' },
        { time: '3:00 PM - 4:00 PM', subject: 'Digital Electronics', room: 'EC-101' },
      ],
      Friday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Microprocessors', room: 'EC-102' },
      ],
    },
  },
  {
    id: '5',
    name: 'Prof. Suresh Babu',
    department: 'Mechanical Engineering',
    cabin: 'ME Block - 101',
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer'],
    email: 'suresh.b@psgitech.ac.in',
    phone: '+91 98765 43214',
    timetable: {
      Monday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Thermodynamics', room: 'ME-301' },
        { time: '2:00 PM - 3:00 PM', subject: 'Fluid Mechanics', room: 'ME-302' },
      ],
      Tuesday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Heat Transfer', room: 'ME-303' },
        { time: '11:00 AM - 12:00 PM', subject: 'Thermodynamics', room: 'ME-301' },
      ],
      Wednesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Fluid Mechanics', room: 'ME-302' },
        { time: '3:00 PM - 4:00 PM', subject: 'Heat Transfer', room: 'ME-303' },
      ],
      Thursday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Thermodynamics', room: 'ME-301' },
      ],
      Friday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Fluid Mechanics', room: 'ME-302' },
        { time: '2:00 PM - 3:00 PM', subject: 'Heat Transfer', room: 'ME-303' },
      ],
    },
  },
  {
    id: '6',
    name: 'Dr. Lakshmi Narayan',
    department: 'Mathematics',
    cabin: 'Main Block - 201',
    subjects: ['Calculus', 'Linear Algebra', 'Probability and Statistics'],
    email: 'lakshmi.n@psgitech.ac.in',
    phone: '+91 98765 43215',
    timetable: {
      Monday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Calculus', room: 'MB-101' },
        { time: '11:00 AM - 12:00 PM', subject: 'Linear Algebra', room: 'MB-102' },
      ],
      Tuesday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Probability and Statistics', room: 'MB-103' },
        { time: '2:00 PM - 3:00 PM', subject: 'Calculus', room: 'MB-101' },
      ],
      Wednesday: [
        { time: '9:00 AM - 10:00 AM', subject: 'Linear Algebra', room: 'MB-102' },
      ],
      Thursday: [
        { time: '11:00 AM - 12:00 PM', subject: 'Probability and Statistics', room: 'MB-103' },
        { time: '3:00 PM - 4:00 PM', subject: 'Calculus', room: 'MB-101' },
      ],
      Friday: [
        { time: '10:00 AM - 11:00 AM', subject: 'Linear Algebra', room: 'MB-102' },
      ],
    },
  },
];

export function FacultyAccessPage({ user, onBack }: { user: User; onBack: () => void }) {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const filteredFaculty = facultyData.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedFaculty) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSelectedFaculty(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Faculty List
        </button>

        <div className="max-w-5xl mx-auto">
          {/* Faculty Profile Header */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-3xl">{selectedFaculty.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h1 className="text-gray-900 mb-2">{selectedFaculty.name}</h1>
                <p className="text-gray-600 mb-4">{selectedFaculty.department}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedFaculty.cabin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{selectedFaculty.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{selectedFaculty.phone}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Handling Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFaculty.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timetable */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
            <h2 className="text-gray-900 mb-6">Weekly Timetable</h2>
            
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-purple-50 px-4 py-3">
                    <h3 className="text-gray-900">{day}</h3>
                  </div>
                  <div className="p-4">
                    {selectedFaculty.timetable[day] && selectedFaculty.timetable[day].length > 0 ? (
                      <div className="space-y-3">
                        {selectedFaculty.timetable[day].map((slot, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">{slot.time}</span>
                              </div>
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

          {/* Request Doubt Session Button */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <button
              onClick={() => setShowRequestModal(true)}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xl"
            >
              <strong>REQUEST DOUBT SESSION</strong>
            </button>
            <p className="text-gray-600 mt-4">Schedule a one-on-one session to clarify your doubts</p>
          </div>
        </div>

        {/* Request Modal */}
        {showRequestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h2 className="text-gray-900 mb-4">Request Doubt Session</h2>
              <p className="text-gray-600 mb-4">
                with {selectedFaculty.name}
              </p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Preferred Time</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>9:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 11:00 AM</option>
                    <option>11:00 AM - 12:00 PM</option>
                    <option>2:00 PM - 3:00 PM</option>
                    <option>3:00 PM - 4:00 PM</option>
                    <option>4:00 PM - 5:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {selectedFaculty.subjects.map((subject, index) => (
                      <option key={index}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Briefly describe your doubts..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Doubt session request submitted successfully!');
                      setShowRequestModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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
          <h1 className="text-gray-900 mb-2">Faculty Directory</h1>
          <p className="text-gray-600">Browse faculty members and view their schedules</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, department, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Faculty List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((faculty) => (
            <button
              key={faculty.id}
              onClick={() => setSelectedFaculty(faculty)}
              className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 text-xl">{faculty.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1 truncate">{faculty.name}</h3>
                  <p className="text-sm text-gray-600">{faculty.department}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{faculty.cabin}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {faculty.subjects.slice(0, 2).map((subject, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                      {subject}
                    </span>
                  ))}
                  {faculty.subjects.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{faculty.subjects.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-purple-600">Click to view timetable →</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
