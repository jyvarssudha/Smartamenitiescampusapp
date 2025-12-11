import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Search, Filter } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type Facility = {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  amenities: string[];
  available: boolean;
};

const facilities: Facility[] = [
  {
    id: '1',
    name: 'Seminar Hall A',
    type: 'Hall',
    capacity: 200,
    location: 'Main Building, 2nd Floor',
    amenities: ['Projector', 'AC', 'Sound System', 'Podium'],
    available: true,
  },
  {
    id: '2',
    name: 'Computer Lab 201',
    type: 'Lab',
    capacity: 60,
    location: 'CS Building, 2nd Floor',
    amenities: ['60 Computers', 'AC', 'Projector', 'Whiteboard'],
    available: true,
  },
  {
    id: '3',
    name: 'Conference Room C',
    type: 'Meeting Room',
    capacity: 20,
    location: 'Admin Block, 1st Floor',
    amenities: ['Video Conference', 'AC', 'Whiteboard', 'WiFi'],
    available: true,
  },
  {
    id: '4',
    name: 'Sports Ground',
    type: 'Outdoor',
    capacity: 100,
    location: 'Athletic Complex',
    amenities: ['Floodlights', 'Seating', 'Changing Rooms'],
    available: false,
  },
  {
    id: '5',
    name: 'Auditorium',
    type: 'Hall',
    capacity: 500,
    location: 'Main Building, Ground Floor',
    amenities: ['Stage', 'Sound System', 'Lighting', 'AC', 'Green Room'],
    available: true,
  },
  {
    id: '6',
    name: 'Library Study Room',
    type: 'Study Room',
    capacity: 12,
    location: 'Library, 3rd Floor',
    amenities: ['Whiteboard', 'AC', 'WiFi', 'Quiet Zone'],
    available: true,
  },
];

export function FacilityBooking({ user }: { user: User }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleBookFacility = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowBookingForm(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Facility Booking</h1>
        <p className="text-gray-600">Browse and book campus facilities</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="all">All Types</option>
            <option value="Hall">Halls</option>
            <option value="Lab">Labs</option>
            <option value="Meeting Room">Meeting Rooms</option>
            <option value="Study Room">Study Rooms</option>
            <option value="Outdoor">Outdoor</option>
          </select>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map(facility => (
          <div
            key={facility.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{facility.name}</h3>
                <p className="text-sm text-gray-500">{facility.type}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  facility.available
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {facility.available ? 'Available' : 'Booked'}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Capacity: {facility.capacity} people</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{facility.location}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {facility.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleBookFacility(facility)}
              disabled={!facility.available}
              className={`w-full py-2 rounded-lg transition-colors ${
                facility.available
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {facility.available ? 'Book Now' : 'Not Available'}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedFacility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-gray-900 mb-4">Book {selectedFacility.name}</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Purpose</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description of the event..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Expected Attendees</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  max={selectedFacility.capacity}
                  placeholder={`Max ${selectedFacility.capacity}`}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingForm(false);
                    setSelectedFacility(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Booking request submitted successfully!');
                    setShowBookingForm(false);
                    setSelectedFacility(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
