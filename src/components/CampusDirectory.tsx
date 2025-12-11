import { useState } from 'react';
import { Building2, MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

type Facility = {
  id: string;
  name: string;
  building: string;
  floor: string;
  type: string;
  contact?: string;
  email?: string;
  hours: string;
};

const directories: Facility[] = [
  {
    id: '1',
    name: 'Main Administrative Office',
    building: 'Admin Block',
    floor: 'Ground Floor',
    type: 'Administration',
    contact: '+1 (555) 0100',
    email: 'admin@campus.edu',
    hours: '9:00 AM - 5:00 PM',
  },
  {
    id: '2',
    name: 'Computer Science Department',
    building: 'CS Building',
    floor: '3rd Floor',
    type: 'Department',
    contact: '+1 (555) 0201',
    email: 'cs.dept@campus.edu',
    hours: '8:00 AM - 6:00 PM',
  },
  {
    id: '3',
    name: 'Library',
    building: 'Library Building',
    floor: 'All Floors',
    type: 'Academic',
    contact: '+1 (555) 0300',
    email: 'library@campus.edu',
    hours: '7:00 AM - 10:00 PM',
  },
  {
    id: '4',
    name: 'Student Services Center',
    building: 'Student Center',
    floor: '1st Floor',
    type: 'Student Services',
    contact: '+1 (555) 0400',
    email: 'studentservices@campus.edu',
    hours: '8:00 AM - 7:00 PM',
  },
  {
    id: '5',
    name: 'Cafeteria',
    building: 'Main Building',
    floor: 'Ground Floor',
    type: 'Dining',
    contact: '+1 (555) 0500',
    hours: '7:00 AM - 8:00 PM',
  },
  {
    id: '6',
    name: 'Medical Center',
    building: 'Health Services',
    floor: 'Ground Floor',
    type: 'Health',
    contact: '+1 (555) 0600',
    email: 'health@campus.edu',
    hours: '24/7',
  },
  {
    id: '7',
    name: 'Sports Complex',
    building: 'Athletic Building',
    floor: 'All Floors',
    type: 'Recreation',
    contact: '+1 (555) 0700',
    email: 'sports@campus.edu',
    hours: '6:00 AM - 10:00 PM',
  },
  {
    id: '8',
    name: 'IT Help Desk',
    building: 'Main Building',
    floor: '2nd Floor',
    type: 'Technology',
    contact: '+1 (555) 0800',
    email: 'ithelp@campus.edu',
    hours: '8:00 AM - 8:00 PM',
  },
];

export function CampusDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredDirectories = directories.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || facility.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(directories.map(d => d.type)));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Campus Directory</h1>
        <p className="text-gray-600">Find locations and contact information across campus</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Categories</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDirectories.map(facility => (
          <div key={facility.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{facility.name}</h3>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {facility.type}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>{facility.building}</div>
                  <div className="text-xs text-gray-500">{facility.floor}</div>
                </div>
              </div>

              {facility.contact && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <a href={`tel:${facility.contact}`} className="hover:text-blue-600">
                    {facility.contact}
                  </a>
                </div>
              )}

              {facility.email && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <a href={`mailto:${facility.email}`} className="hover:text-blue-600">
                    {facility.email}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{facility.hours}</span>
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
          </div>
        ))}
      </div>

      {/* Campus Map Section */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-4">Interactive Campus Map</h2>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive campus map would be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">Click on buildings to see facilities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
