import { useState } from 'react';
import { BookOpen, Trophy, UserCheck, School, ArrowLeft, ExternalLink, Users, TrendingUp, Clock, Star, Search, MapPin, Mail, Phone, Map } from 'lucide-react';
import { FacultyAccessPage } from './FacultyAccessPage';
import { ClassroomPage } from './ClassroomPage';
import { IndoorStadiumPage } from './IndoorStadiumPage';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type ServiceType = 'library' | 'indoor-stadium' | 'faculty-access' | 'classroom' | 'campus-map' | null;

// Mock data for library occupancy
const libraryOccupancy = {
  current: 145,
  capacity: 200,
  percentage: 72.5,
  status: 'moderate' as 'low' | 'moderate' | 'high',
};

// Mock data for reading history and recommendations
const readingHistory = [
  { title: 'Clean Code', author: 'Robert C. Martin', borrowedDate: '2025-11-15' },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', borrowedDate: '2025-10-20' },
  { title: 'Design Patterns', author: 'Erich Gamma', borrowedDate: '2025-09-10' },
];

const recommendations = [
  {
    title: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    reason: 'Based on "Clean Code" by Robert C. Martin',
    available: true,
    rating: 4.8,
    category: 'Software Engineering',
  },
  {
    title: 'Code Complete',
    author: 'Steve McConnell',
    reason: 'Readers who enjoyed "The Pragmatic Programmer" also liked this',
    available: true,
    rating: 4.7,
    category: 'Software Engineering',
  },
  {
    title: 'Head First Design Patterns',
    author: 'Eric Freeman',
    reason: 'Based on "Design Patterns" by Erich Gamma',
    available: false,
    rating: 4.6,
    category: 'Software Engineering',
  },
  {
    title: 'Working Effectively with Legacy Code',
    author: 'Michael Feathers',
    reason: 'Popular among Robert C. Martin readers',
    available: true,
    rating: 4.5,
    category: 'Software Engineering',
  },
];

export function StudentDashboard({ user }: { user: User }) {
  const [selectedService, setSelectedService] = useState<ServiceType>(null);

  if (selectedService === 'library') {
    return <LibraryPage user={user} onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === 'indoor-stadium') {
    return <IndoorStadiumPage user={user} onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === 'faculty-access') {
    return <FacultyAccessPage user={user} onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === 'classroom') {
    return <ClassroomPage user={user} onBack={() => setSelectedService(null)} />;
  }

  if (selectedService === 'campus-map') {
    return <CampusMapPage user={user} onBack={() => setSelectedService(null)} />;
  }

  if (selectedService) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <button
          onClick={() => setSelectedService(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Services
        </button>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-gray-900 mb-4 capitalize">{selectedService.replace('-', ' ')}</h2>
            <p className="text-gray-600">
              {selectedService === 'indoor-stadium' && 'Book indoor sports facilities and view available time slots.'}
              {selectedService === 'faculty-access' && 'Connect with faculty members and schedule appointments.'}
              {selectedService === 'classroom' && 'View classroom schedules and make reservations for group studies.'}
              {selectedService === 'campus-map' && 'Explore the campus layout and find your way around.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-slate-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-slate-600">Select a service to get started</p>
          <p className="text-sm text-slate-500 mt-1">Register Number: {user.id}</p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard
            icon={<BookOpen className="w-12 h-12" />}
            title="Library"
            description="Access books, journals, and study rooms"
            color="blue"
            onClick={() => setSelectedService('library')}
          />
          <ServiceCard
            icon={<Trophy className="w-12 h-12" />}
            title="Indoor Stadium"
            description="Book sports facilities and equipment"
            color="cyan"
            onClick={() => setSelectedService('indoor-stadium')}
          />
          <ServiceCard
            icon={<UserCheck className="w-12 h-12" />}
            title="Faculty Access"
            description="Connect with professors and advisors"
            color="indigo"
            onClick={() => setSelectedService('faculty-access')}
          />
          <ServiceCard
            icon={<School className="w-12 h-12" />}
            title="Classroom"
            description="Reserve classrooms for group activities"
            color="violet"
            onClick={() => setSelectedService('classroom')}
          />
          <ServiceCard
            icon={<Map className="w-12 h-12" />}
            title="Campus Map"
            description="Explore the campus layout and find your way around"
            color="teal"
            onClick={() => setSelectedService('campus-map')}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-slate-900 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatBox label="Active Bookings" value="2" color="blue" />
            <StatBox label="Books Borrowed" value="3" color="cyan" />
            <StatBox label="Upcoming Appointments" value="1" color="indigo" />
            <StatBox label="Study Hours" value="12h" color="teal" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'cyan' | 'indigo' | 'violet' | 'teal';
  onClick: () => void;
}) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      shadow: 'hover:shadow-blue-200',
    },
    cyan: {
      bg: 'from-cyan-600 to-cyan-700',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
      shadow: 'hover:shadow-cyan-200',
    },
    indigo: {
      bg: 'from-indigo-600 to-indigo-700',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
      shadow: 'hover:shadow-indigo-200',
    },
    violet: {
      bg: 'from-violet-600 to-violet-700',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-700',
      shadow: 'hover:shadow-violet-200',
    },
    teal: {
      bg: 'from-teal-600 to-teal-700',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
      shadow: 'hover:shadow-teal-200',
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl border border-slate-200 p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${colors.shadow} group`}
    >
      {/* Gradient Background Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-10 rounded-bl-full transition-all group-hover:opacity-20`}></div>
      
      {/* Icon */}
      <div className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 relative z-10`}>
        <div className={colors.iconColor}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-gray-900 mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 relative z-10">{description}</p>

      {/* Arrow Indicator */}
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
  color: 'blue' | 'cyan' | 'indigo' | 'teal';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    cyan: 'bg-cyan-50 text-cyan-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    teal: 'bg-teal-50 text-teal-600',
  };

  return (
    <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function LibraryPage({ user, onBack }: { user: User; onBack: () => void }) {
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
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Library Services</h1>
          <p className="text-gray-600">Access digital resources and manage your library account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Library Website Link */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-gray-900">Library Portal</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Access the digital library, search catalog, and manage your account
            </p>
            <a
              href="http://library.psgitech.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Library Website
            </a>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Quick Access:</p>
              <div className="space-y-2">
                <a href="http://library.psgitech.ac.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 block">
                  📚 Catalog Search
                </a>
                <a href="http://library.psgitech.ac.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 block">
                  📖 E-Resources
                </a>
                <a href="http://library.psgitech.ac.in/" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 block">
                  🔖 My Account
                </a>
              </div>
            </div>
          </div>

          {/* Availability Checker */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-gray-900">Live Availability</h2>
            </div>
            <p className="text-gray-600 mb-6">Real-time library occupancy status</p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg ${
                    libraryOccupancy.status === 'low'
                      ? 'bg-green-500'
                      : libraryOccupancy.status === 'moderate'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-white text-3xl">{libraryOccupancy.percentage.toFixed(0)}%</p>
                    <p className="text-white text-xs mt-1">Occupied</p>
                  </div>
                </div>
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full animate-pulse ${
                  libraryOccupancy.status === 'low'
                    ? 'bg-green-400'
                    : libraryOccupancy.status === 'moderate'
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Current Occupancy</span>
                <span className="text-gray-900">{libraryOccupancy.current} / {libraryOccupancy.capacity}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Available Seats</span>
                <span className="text-gray-900">{libraryOccupancy.capacity - libraryOccupancy.current}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  libraryOccupancy.status === 'low'
                    ? 'bg-green-100 text-green-700'
                    : libraryOccupancy.status === 'moderate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {libraryOccupancy.status === 'low' ? '🟢 Available' : 
                   libraryOccupancy.status === 'moderate' ? '🟡 Moderate' : '🔴 Crowded'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Last updated: Just now</span>
              </div>
            </div>
          </div>

          {/* Personal Recommendations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-gray-900">For You</h2>
            </div>
            <p className="text-gray-600 mb-4">Based on your reading history</p>

            {/* Reading History Summary */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">Recently Borrowed:</p>
              <div className="space-y-1">
                {readingHistory.slice(0, 2).map((book, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    📚 {book.title}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {recommendations.map((book, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900 line-clamp-2">{book.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">by {book.author}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600">{book.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 italic">{book.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{book.category}</span>
                    {book.available ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        ✓ Available
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                        Reserved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Resources Section */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Your Reading Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Books Borrowed</p>
              <p className="text-blue-600 text-2xl">3</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Books Returned</p>
              <p className="text-green-600 text-2xl">12</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Favorite Author</p>
              <p className="text-purple-600 text-sm">Robert C. Martin</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Reading Streak</p>
              <p className="text-orange-600 text-2xl">5 weeks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampusMapPage({ user, onBack }: { user: User; onBack: () => void }) {
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
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Interactive Campus Map</h1>
          <p className="text-gray-600">Take a 360° virtual tour of PSG iTech campus</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Interactive Campus Map */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <Map className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900">360° Virtual Campus Tour</h2>
                <p className="text-sm text-gray-600">Explore every corner of our beautiful campus</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Experience an immersive 360-degree virtual tour of PSG iTech campus. Explore classrooms, labs, 
                libraries, sports facilities, hostels, and more from the comfort of your device.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 text-2xl mb-1">🏛️</p>
                  <p className="text-xs text-gray-600">Academic Blocks</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 text-2xl mb-1">🔬</p>
                  <p className="text-xs text-gray-600">Labs & Libraries</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 text-2xl mb-1">🏃</p>
                  <p className="text-xs text-gray-600">Sports Complex</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 text-2xl mb-1">🏠</p>
                  <p className="text-xs text-gray-600">Hostels</p>
                </div>
              </div>
            </div>

            <a
              href="https://psgitech.ac.in/360tour"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-lg">Start Virtual Tour</span>
            </a>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-3">Features:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  360° panoramic views
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Interactive navigation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Location markers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Mobile friendly
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Popular Locations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a 
                href="https://psgitech.ac.in/360tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-red-50 hover:border-red-200 border border-transparent transition-all text-center"
              >
                <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900">Main Block</p>
              </a>
              <a 
                href="https://psgitech.ac.in/360tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-red-50 hover:border-red-200 border border-transparent transition-all text-center"
              >
                <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900">Library</p>
              </a>
              <a 
                href="https://psgitech.ac.in/360tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-red-50 hover:border-red-200 border border-transparent transition-all text-center"
              >
                <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900">Indoor Stadium</p>
              </a>
              <a 
                href="https://psgitech.ac.in/360tour" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 bg-gray-50 rounded-lg hover:bg-red-50 hover:border-red-200 border border-transparent transition-all text-center"
              >
                <MapPin className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900">Cafeteria</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}