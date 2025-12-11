import { useState } from 'react';
import { Plus, Wrench, AlertCircle, CheckCircle, Clock, Search } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

type MaintenanceRequest = {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  createdAt: string;
  assignedTo?: string;
};

const initialRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'AC Not Working',
    description: 'Air conditioning unit in Lab 201 is not cooling properly',
    location: 'CS Building, Lab 201',
    priority: 'high',
    status: 'completed',
    category: 'HVAC',
    createdAt: '2025-11-28',
    assignedTo: 'John Maintenance',
  },
  {
    id: '2',
    title: 'Projector Issue',
    description: 'Projector not turning on in Seminar Hall A',
    location: 'Main Building, Seminar Hall A',
    priority: 'medium',
    status: 'in-progress',
    category: 'Electronics',
    createdAt: '2025-11-29',
    assignedTo: 'Sarah Tech',
  },
  {
    id: '3',
    title: 'WiFi Connectivity Problem',
    description: 'Intermittent WiFi connection in Library Wing',
    location: 'Library Building',
    priority: 'high',
    status: 'pending',
    category: 'IT',
    createdAt: '2025-12-01',
  },
];

export function MaintenanceRequests({ user }: { user: User }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRequest: MaintenanceRequest = {
      id: String(requests.length + 1),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      status: 'pending',
      category: formData.get('category') as string,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRequests([newRequest, ...requests]);
    setShowNewRequestForm(false);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Maintenance Requests</h1>
          <p className="text-gray-600">Track and manage facility maintenance</p>
        </div>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Request
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => (
          <RequestCard key={request.id} request={request} user={user} />
        ))}
      </div>

      {/* New Request Form Modal */}
      {showNewRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-gray-900 mb-4">New Maintenance Request</h2>
            
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief title of the issue"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Electronics">Electronics</option>
                  <option value="IT">IT/Network</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Building and room number"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Priority</label>
                <select
                  name="priority"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Detailed description of the issue..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewRequestForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
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

function RequestCard({ request, user }: { request: MaintenanceRequest; user: User }) {
  const statusConfig = {
    pending: {
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    'in-progress': {
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    completed: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700',
  };

  const config = statusConfig[request.status];
  const Icon = config.icon;

  return (
    <div className={`bg-white rounded-xl border ${config.border} p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-gray-900">{request.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${priorityColors[request.priority]}`}>
                {request.priority} Priority
              </span>
            </div>
            <p className="text-gray-600 mb-3">{request.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Wrench className="w-4 h-4" />
                {request.category}
              </span>
              <span>📍 {request.location}</span>
              <span>📅 {new Date(request.createdAt).toLocaleDateString()}</span>
              {request.assignedTo && (
                <span>👤 Assigned to: {request.assignedTo}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className={`px-3 py-1 rounded-full text-sm capitalize ${config.color} ${config.bg}`}>
          {request.status.replace('-', ' ')}
        </span>
        {user.role === 'maintenance-staff' && request.status !== 'completed' && (
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
            Update Status
          </button>
        )}
      </div>
    </div>
  );
}
