import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Newspaper, Activity, Plus, Calendar, Clock, MapPin, TrendingUp } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type SubSection = 'main' | 'digital-bulletin' | 'events' | 'equipment-tracker';

type BulletinItem = {
  id: string;
  type: 'news' | 'motivational';
  content: string;
  author?: string;
  date: string;
};

type Tournament = {
  id: string;
  name: string;
  sport: string;
  date: string;
  time: string;
  venue: string;
  registrationDeadline: string;
  maxTeams: number;
  currentTeams: number;
};

type EquipmentUsage = {
  sport: string;
  usage: number; // percentage
  available: boolean;
  peakHours: string;
};

const motivationalQuotes = [
  "The only way to prove that you're a good sport is to lose.",
  "Champions keep playing until they get it right.",
  "Hard work beats talent when talent doesn't work hard.",
  "Success is where preparation and opportunity meet.",
  "It's not whether you get knocked down, it's whether you get up.",
];

const STORAGE_KEYS = {
  TOURNAMENTS: 'pt_tournaments',
  BULLETIN: 'pt_bulletin',
  EQUIPMENT: 'pt_equipment_stats',
};

// Default bulletin items (shown if PT staff hasn't added any)
const defaultBulletinItems: BulletinItem[] = [
  {
    id: '1',
    type: 'news',
    content: 'India wins bronze medal in badminton mixed team event at Asian Games 2025',
    date: '2025-12-08',
  },
  {
    id: '2',
    type: 'news',
    content: 'Virat Kohli becomes first cricketer to score 27,000 international runs',
    date: '2025-12-07',
  },
  {
    id: '3',
    type: 'news',
    content: 'PV Sindhu advances to semifinals of Indonesia Masters badminton tournament',
    date: '2025-12-06',
  },
  {
    id: '4',
    type: 'news',
    content: 'Indian football team qualifies for AFC Asian Cup 2027',
    date: '2025-12-05',
  },
];

// Default tournaments (shown if PT staff hasn't added any)
const defaultTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Inter-Department Chess Championship',
    sport: 'Chess',
    date: '2025-12-16',
    time: '9:00 AM - 5:00 PM',
    venue: 'Indoor Stadium - Hall A',
    registrationDeadline: '2025-12-12',
    maxTeams: 16,
    currentTeams: 12,
  },
  {
    id: '2',
    name: 'Table Tennis Tournament 2025',
    sport: 'Table Tennis',
    date: '2025-12-18',
    time: '10:00 AM - 6:00 PM',
    venue: 'Indoor Stadium - Hall B',
    registrationDeadline: '2025-12-14',
    maxTeams: 24,
    currentTeams: 18,
  },
  {
    id: '3',
    name: 'Badminton Doubles Championship',
    sport: 'Badminton',
    date: '2025-12-20',
    time: '8:00 AM - 4:00 PM',
    venue: 'Indoor Stadium - Main Court',
    registrationDeadline: '2025-12-16',
    maxTeams: 20,
    currentTeams: 15,
  },
  {
    id: '4',
    name: 'Carrom Singles Tournament',
    sport: 'Carrom',
    date: '2025-12-22',
    time: '2:00 PM - 8:00 PM',
    venue: 'Indoor Stadium - Hall C',
    registrationDeadline: '2025-12-18',
    maxTeams: 32,
    currentTeams: 28,
  },
  {
    id: '5',
    name: 'Basketball 3v3 Championship',
    sport: 'Basketball',
    date: '2025-12-25',
    time: '9:00 AM - 5:00 PM',
    venue: 'Outdoor Basketball Court',
    registrationDeadline: '2025-12-20',
    maxTeams: 12,
    currentTeams: 9,
  },
];

// Default equipment data (shown if PT staff hasn't updated)
const defaultEquipmentUsageData: EquipmentUsage[] = [
  {
    sport: 'Chess',
    usage: 45,
    available: true,
    peakHours: '4:00 PM - 6:00 PM',
  },
  {
    sport: 'Table Tennis',
    usage: 78,
    available: true,
    peakHours: '5:00 PM - 7:00 PM',
  },
  {
    sport: 'Badminton',
    usage: 92,
    available: false,
    peakHours: '6:00 PM - 8:00 PM',
  },
  {
    sport: 'Carrom',
    usage: 38,
    available: true,
    peakHours: '3:00 PM - 5:00 PM',
  },
  {
    sport: 'Football',
    usage: 65,
    available: true,
    peakHours: '5:00 PM - 7:00 PM',
  },
  {
    sport: 'Basketball',
    usage: 70,
    available: true,
    peakHours: '4:00 PM - 6:00 PM',
  },
  {
    sport: 'Cricket',
    usage: 55,
    available: true,
    peakHours: '5:00 PM - 7:00 PM',
  },
  {
    sport: 'Volleyball',
    usage: 48,
    available: true,
    peakHours: '4:00 PM - 6:00 PM',
  },
];

export function IndoorStadiumPage({ user, onBack }: { user: User; onBack: () => void }) {
  const [subSection, setSubSection] = useState<SubSection>('main');
  const [todaysQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  
  // Load data from localStorage (updated by PT staff)
  const [bulletinItems, setBulletinItems] = useState<BulletinItem[]>(defaultBulletinItems);
  const [tournaments, setTournaments] = useState<Tournament[]>(defaultTournaments);
  const [equipmentUsageData, setEquipmentUsageData] = useState<EquipmentUsage[]>(defaultEquipmentUsageData);

  useEffect(() => {
    // Load bulletin entries from PT staff
    const storedBulletin = localStorage.getItem(STORAGE_KEYS.BULLETIN);
    if (storedBulletin) {
      const ptBulletin = JSON.parse(storedBulletin);
      // Convert PT bulletin format to student bulletin format
      const convertedBulletin: BulletinItem[] = ptBulletin.map((entry: any) => ({
        id: entry.id,
        type: 'news',
        content: entry.type === 'winner' ? `${entry.title}: ${entry.content}` : entry.content,
        date: entry.date,
      }));
      if (convertedBulletin.length > 0) {
        setBulletinItems([...convertedBulletin, ...defaultBulletinItems]);
      }
    }

    // Load tournaments from PT staff
    const storedTournaments = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
    if (storedTournaments) {
      const ptTournaments = JSON.parse(storedTournaments);
      // Convert PT tournament format to student tournament format
      const convertedTournaments: Tournament[] = ptTournaments.map((t: any) => ({
        id: t.id,
        name: t.name,
        sport: t.sport,
        date: t.date,
        time: t.time,
        venue: t.venue || 'Indoor Stadium',
        registrationDeadline: t.date,
        maxTeams: 20,
        currentTeams: 12,
      }));
      if (convertedTournaments.length > 0) {
        setTournaments([...convertedTournaments, ...defaultTournaments]);
      }
    }

    // Load equipment stats from PT staff
    const storedEquipment = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);
    if (storedEquipment) {
      const ptEquipment = JSON.parse(storedEquipment);
      if (ptEquipment.length > 0) {
        setEquipmentUsageData(ptEquipment);
      }
    }
  }, [subSection]); // Reload when switching sections

  // Find the most available equipment (lowest usage that's available)
  const mostAvailableEquipment = equipmentUsageData
    .filter(e => e.available)
    .sort((a, b) => a.usage - b.usage)[0];

  if (subSection === 'digital-bulletin') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSubSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Indoor Stadium
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Digital Bulletin</h1>
            <p className="text-gray-600">Latest sports news and daily motivation</p>
          </div>

          {/* Motivational Quote of the Day */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="mb-4">Motivational Quote of the Day</h2>
                <p className="text-xl italic leading-relaxed">"{todaysQuote}"</p>
                <p className="text-sm mt-4 opacity-90">Stay motivated and keep pushing your limits!</p>
              </div>
            </div>
          </div>

          {/* Sports News */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-gray-900">Latest Sports News</h2>
            </div>

            <div className="space-y-4">
              {bulletinItems.map((item) => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{item.content}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      Global News
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (subSection === 'events') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSubSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Indoor Stadium
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Upcoming Tournaments & Games</h1>
            <p className="text-gray-600">Register for upcoming sports events and tournaments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{tournament.name}</h3>
                    <p className="text-sm text-gray-600">{tournament.sport}</p>
                  </div>
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tournament.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{tournament.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{tournament.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                  <span className="text-sm text-gray-600">Teams Registered</span>
                  <span className="text-gray-900">
                    {tournament.currentTeams} / {tournament.maxTeams}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Registration Progress</span>
                    <span>{Math.round((tournament.currentTeams / tournament.maxTeams) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(tournament.currentTeams / tournament.maxTeams) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Registration Deadline: {new Date(tournament.registrationDeadline).toLocaleDateString()}
                </p>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (subSection === 'equipment-tracker') {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <button
          onClick={() => setSubSection('main')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Indoor Stadium
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Equipment Tracker</h1>
            <p className="text-gray-600">Real-time availability based on weekly usage statistics</p>
          </div>

          {/* Most Available Equipment Highlight */}
          {mostAvailableEquipment && (
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="mb-2">Most Available Right Now</h2>
                  <p className="text-3xl mb-2">{mostAvailableEquipment.sport}</p>
                  <p className="text-white text-opacity-90">
                    Only {mostAvailableEquipment.usage}% utilized - Great time to play!
                  </p>
                  <p className="text-sm text-white text-opacity-80 mt-2">
                    Peak Hours: {mostAvailableEquipment.peakHours}
                  </p>
                </div>
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-16 h-16" />
                </div>
              </div>
            </div>
          )}

          {/* All Equipment Status */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-gray-900 mb-6">All Equipment Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipmentUsageData.map((equipment) => (
                <div key={equipment.sport} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">{equipment.sport}</h3>
                    {equipment.available ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Available
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        Busy
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Current Usage</span>
                      <span>{equipment.usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          equipment.usage < 50
                            ? 'bg-green-500'
                            : equipment.usage < 80
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${equipment.usage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Peak: {equipment.peakHours}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                📊 <strong>Note:</strong> Usage statistics are updated weekly by PT staff based on surveys and facility usage data.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Indoor Stadium Menu
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
          <h1 className="text-gray-900 mb-2">Indoor Stadium</h1>
          <p className="text-gray-600">Access sports facilities, tournaments, and equipment information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setSubSection('digital-bulletin')}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-left hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Newspaper className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-gray-900 mb-3">Digital Bulletin</h2>
            <p className="text-gray-600">Sports news and motivational quotes</p>
          </button>

          <button
            onClick={() => setSubSection('events')}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-left hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-gray-900 mb-3">Events</h2>
            <p className="text-gray-600">Upcoming tournaments and games</p>
          </button>

          <button
            onClick={() => setSubSection('equipment-tracker')}
            className="bg-white rounded-2xl border border-gray-200 p-8 text-left hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-3">Equipment Tracker</h2>
            <p className="text-gray-600">Check equipment availability</p>
          </button>
        </div>
      </div>
    </div>
  );
}