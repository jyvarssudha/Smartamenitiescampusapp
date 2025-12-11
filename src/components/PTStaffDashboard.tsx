import { useState, useEffect } from 'react';
import { Trophy, Newspaper, Activity, Plus, ArrowLeft, Calendar, Clock, MapPin, Trash2, Edit2, Save, X, TrendingUp } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type PTView = 'main' | 'events' | 'bulletin' | 'tracker';

type Tournament = {
  id: string;
  name: string;
  sport: string;
  date: string;
  time: string;
  venue: string;
  addedBy: string;
  addedDate: string;
};

type BulletinEntry = {
  id: string;
  type: 'winner' | 'news';
  title: string;
  content: string;
  date: string;
  addedBy: string;
};

type EquipmentStat = {
  sport: string;
  usage: number;
  available: boolean;
  peakHours: string;
  lastUpdated: string;
};

const STORAGE_KEYS = {
  TOURNAMENTS: 'pt_tournaments',
  BULLETIN: 'pt_bulletin',
  EQUIPMENT: 'pt_equipment_stats',
};

// Default equipment list
const defaultEquipment: EquipmentStat[] = [
  { sport: 'Chess', usage: 45, available: true, peakHours: '4:00 PM - 6:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Table Tennis', usage: 78, available: true, peakHours: '5:00 PM - 7:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Badminton', usage: 92, available: false, peakHours: '6:00 PM - 8:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Carrom', usage: 38, available: true, peakHours: '3:00 PM - 5:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Football', usage: 65, available: true, peakHours: '5:00 PM - 7:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Basketball', usage: 70, available: true, peakHours: '4:00 PM - 6:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Cricket', usage: 55, available: true, peakHours: '5:00 PM - 7:00 PM', lastUpdated: new Date().toISOString() },
  { sport: 'Volleyball', usage: 48, available: true, peakHours: '4:00 PM - 6:00 PM', lastUpdated: new Date().toISOString() },
];

export function PTStaffDashboard({ user }: { user: User }) {
  const [currentView, setCurrentView] = useState<PTView>('main');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [bulletinEntries, setBulletinEntries] = useState<BulletinEntry[]>([]);
  const [equipmentStats, setEquipmentStats] = useState<EquipmentStat[]>(defaultEquipment);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadedTournaments = localStorage.getItem(STORAGE_KEYS.TOURNAMENTS);
    const loadedBulletin = localStorage.getItem(STORAGE_KEYS.BULLETIN);
    const loadedEquipment = localStorage.getItem(STORAGE_KEYS.EQUIPMENT);

    if (loadedTournaments) {
      setTournaments(JSON.parse(loadedTournaments));
    }
    if (loadedBulletin) {
      setBulletinEntries(JSON.parse(loadedBulletin));
    }
    if (loadedEquipment) {
      setEquipmentStats(JSON.parse(loadedEquipment));
    }
  }, []);

  // Save tournaments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TOURNAMENTS, JSON.stringify(tournaments));
  }, [tournaments]);

  // Save bulletin to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BULLETIN, JSON.stringify(bulletinEntries));
  }, [bulletinEntries]);

  // Save equipment stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipmentStats));
  }, [equipmentStats]);

  if (currentView === 'events') {
    return (
      <EventsManagement
        user={user}
        tournaments={tournaments}
        setTournaments={setTournaments}
        onBack={() => setCurrentView('main')}
      />
    );
  }

  if (currentView === 'bulletin') {
    return (
      <BulletinManagement
        user={user}
        bulletinEntries={bulletinEntries}
        setBulletinEntries={setBulletinEntries}
        onBack={() => setCurrentView('main')}
      />
    );
  }

  if (currentView === 'tracker') {
    return (
      <TrackerManagement
        user={user}
        equipmentStats={equipmentStats}
        setEquipmentStats={setEquipmentStats}
        onBack={() => setCurrentView('main')}
      />
    );
  }

  // Main PT Staff Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-2">PT Staff Dashboard</h1>
          <p className="text-gray-600">Manage Indoor Stadium Services</p>
          <p className="text-sm text-gray-500 mt-1">Employee ID: {user.id}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ManagementCard
            icon={<Trophy className="w-12 h-12" />}
            title="Events"
            description="Add and manage tournaments"
            color="blue"
            count={tournaments.length}
            onClick={() => setCurrentView('events')}
          />
          <ManagementCard
            icon={<Newspaper className="w-12 h-12" />}
            title="Bulletin"
            description="Update winners and sports news"
            color="purple"
            count={bulletinEntries.length}
            onClick={() => setCurrentView('bulletin')}
          />
          <ManagementCard
            icon={<Activity className="w-12 h-12" />}
            title="Equipment Tracker"
            description="Update usage statistics"
            color="green"
            count={equipmentStats.length}
            onClick={() => setCurrentView('tracker')}
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
              <p className="text-sm opacity-80 mb-1">Active Tournaments</p>
              <p className="text-2xl">{tournaments.length}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl text-purple-600">
              <p className="text-sm opacity-80 mb-1">Bulletin Entries</p>
              <p className="text-2xl">{bulletinEntries.length}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl text-green-600">
              <p className="text-sm opacity-80 mb-1">Equipment Tracked</p>
              <p className="text-2xl">{equipmentStats.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagementCard({
  icon,
  title,
  description,
  color,
  count,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple';
  count: number;
  onClick: () => void;
}) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      shadow: 'hover:shadow-blue-200',
    },
    green: {
      bg: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      shadow: 'hover:shadow-green-200',
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
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} opacity-10 rounded-bl-full transition-all group-hover:opacity-20`}></div>
      
      <div className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 relative z-10`}>
        <div className={colors.iconColor}>
          {icon}
        </div>
      </div>

      <h3 className="text-gray-900 mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 relative z-10 mb-4">{description}</p>
      
      <div className={`inline-flex px-3 py-1 rounded-full text-sm ${colors.iconBg} ${colors.iconColor}`}>
        {count} {count === 1 ? 'item' : 'items'}
      </div>

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

function EventsManagement({
  user,
  tournaments,
  setTournaments,
  onBack,
}: {
  user: User;
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  onBack: () => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTournament, setNewTournament] = useState({
    name: '',
    sport: '',
    date: '',
    time: '',
    venue: '',
  });

  const handleAddTournament = () => {
    if (!newTournament.name || !newTournament.sport || !newTournament.date || !newTournament.time) {
      alert('Please fill in all required fields');
      return;
    }

    const tournament: Tournament = {
      id: Date.now().toString(),
      ...newTournament,
      addedBy: user.name,
      addedDate: new Date().toISOString(),
    };

    setTournaments([...tournaments, tournament]);
    setNewTournament({ name: '', sport: '', date: '', time: '', venue: '' });
    setShowAddForm(false);
  };

  const handleDeleteTournament = (id: string) => {
    if (confirm('Are you sure you want to delete this tournament?')) {
      setTournaments(tournaments.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">Tournament Management</h1>
            <p className="text-gray-600">Add and manage upcoming tournaments</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Tournament
          </button>
        </div>

        {/* Add Tournament Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="text-gray-900 mb-4">New Tournament</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tournament Name *</label>
                <input
                  type="text"
                  value={newTournament.name}
                  onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Inter-Department Chess Championship"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Sport *</label>
                <input
                  type="text"
                  value={newTournament.sport}
                  onChange={(e) => setNewTournament({ ...newTournament, sport: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chess, Football, Badminton"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={newTournament.date}
                  onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Time *</label>
                <input
                  type="text"
                  value={newTournament.time}
                  onChange={(e) => setNewTournament({ ...newTournament, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700 mb-2">Venue</label>
                <input
                  type="text"
                  value={newTournament.venue}
                  onChange={(e) => setNewTournament({ ...newTournament, venue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Indoor Stadium - Hall A"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddTournament}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Tournament
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tournament List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">All Tournaments ({tournaments.length})</h2>
          {tournaments.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tournaments added yet</p>
              <p className="text-sm text-gray-400 mt-2">Click "Add Tournament" to create your first tournament</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">{tournament.sport}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTournament(tournament.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(tournament.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{tournament.time}</span>
                    </div>
                    {tournament.venue && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{tournament.venue}</span>
                      </div>
                    )}
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
                    Added by {tournament.addedBy} on {new Date(tournament.addedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BulletinManagement({
  user,
  bulletinEntries,
  setBulletinEntries,
  onBack,
}: {
  user: User;
  bulletinEntries: BulletinEntry[];
  setBulletinEntries: React.Dispatch<React.SetStateAction<BulletinEntry[]>>;
  onBack: () => void;
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    type: 'winner' as 'winner' | 'news',
    title: '',
    content: '',
  });

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      alert('Please fill in all fields');
      return;
    }

    const entry: BulletinEntry = {
      id: Date.now().toString(),
      ...newEntry,
      date: new Date().toISOString(),
      addedBy: user.name,
    };

    setBulletinEntries([entry, ...bulletinEntries]);
    setNewEntry({ type: 'winner', title: '', content: '' });
    setShowAddForm(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setBulletinEntries(bulletinEntries.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-gray-900 mb-2">Bulletin Management</h1>
            <p className="text-gray-600">Add winners and sports news</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Entry
          </button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="text-gray-900 mb-4">New Bulletin Entry</h2>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Type *</label>
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as 'winner' | 'news' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="winner">Tournament Winner</option>
                  <option value="news">Global Sports News</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={newEntry.type === 'winner' ? 'e.g., Chess Championship Winner' : 'e.g., Cricket World Cup 2025'}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Content *</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                  placeholder={newEntry.type === 'winner' ? 'e.g., Congratulations to Team Alpha for winning the Inter-Department Chess Championship!' : 'e.g., India wins bronze medal in badminton mixed team event at Asian Games 2025'}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddEntry}
                className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Entry
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Bulletin List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">All Bulletin Entries ({bulletinEntries.length})</h2>
          {bulletinEntries.length === 0 ? (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No bulletin entries added yet</p>
              <p className="text-sm text-gray-400 mt-2">Click "Add Entry" to create your first bulletin entry</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bulletinEntries.map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-gray-900">{entry.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          entry.type === 'winner' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {entry.type === 'winner' ? '🏆 Winner' : '📰 News'}
                        </span>
                      </div>
                      <p className="text-gray-600">{entry.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
                    Added by {entry.addedBy} on {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TrackerManagement({
  user,
  equipmentStats,
  setEquipmentStats,
  onBack,
}: {
  user: User;
  equipmentStats: EquipmentStat[];
  setEquipmentStats: React.Dispatch<React.SetStateAction<EquipmentStat[]>>;
  onBack: () => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ usage: number; available: boolean; peakHours: string }>({
    usage: 0,
    available: true,
    peakHours: '',
  });

  const handleEdit = (stat: EquipmentStat) => {
    setEditingId(stat.sport);
    setEditValues({
      usage: stat.usage,
      available: stat.available,
      peakHours: stat.peakHours,
    });
  };

  const handleSave = (sport: string) => {
    setEquipmentStats(equipmentStats.map(stat => 
      stat.sport === sport
        ? { ...stat, ...editValues, lastUpdated: new Date().toISOString() }
        : stat
    ));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Equipment Tracker</h1>
          <p className="text-gray-600">Update weekly equipment usage statistics</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-6">Equipment Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipmentStats.map((stat) => (
              <div key={stat.sport} className="border border-gray-200 rounded-lg p-5">
                {editingId === stat.sport ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <h3 className="text-gray-900">{stat.sport}</h3>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Usage Percentage</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editValues.usage}
                        onChange={(e) => setEditValues({ ...editValues, usage: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Peak Hours</label>
                      <input
                        type="text"
                        value={editValues.peakHours}
                        onChange={(e) => setEditValues({ ...editValues, peakHours: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., 4:00 PM - 6:00 PM"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={editValues.available}
                        onChange={(e) => setEditValues({ ...editValues, available: e.target.checked })}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label className="text-sm text-gray-700">Available for use</label>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(stat.sport)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-900">{stat.sport}</h3>
                      <div className="flex items-center gap-2">
                        {stat.available ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Available
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                            Busy
                          </span>
                        )}
                        <button
                          onClick={() => handleEdit(stat)}
                          className="text-blue-600 hover:text-blue-700 p-2"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Current Usage</span>
                        <span>{stat.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            stat.usage < 50
                              ? 'bg-green-500'
                              : stat.usage < 80
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${stat.usage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Peak: {stat.peakHours}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
                      Last updated: {new Date(stat.lastUpdated).toLocaleDateString()}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              📊 <strong>Note:</strong> These statistics are displayed to students in the Equipment Tracker section. Update them weekly based on surveys and facility usage data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
