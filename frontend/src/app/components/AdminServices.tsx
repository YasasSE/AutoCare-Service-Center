import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  iconName?: string;
  longDescription: string;
  included: string[];
  benefits: string[];
}

interface AdminServicesProps {
  services: Service[];
  onAddService: (service: Omit<Service, 'id'>) => void;
  onUpdateService: (id: string, service: Partial<Service>) => void;
  onDeleteService: (id: string) => void;
}

export function AdminServices({ services, onAddService, onUpdateService, onDeleteService }: AdminServicesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    longDescription: '',
    included: '',
    benefits: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      duration: formData.duration,
      longDescription: formData.longDescription,
      included: formData.included.split('\n').filter(i => i.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim())
    };

    if (editingId) {
      onUpdateService(editingId, serviceData);
      setEditingId(null);
    } else {
      onAddService(serviceData);
      setIsAdding(false);
    }

    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      longDescription: '',
      included: '',
      benefits: ''
    });
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      longDescription: service.longDescription,
      included: service.included.join('\n'),
      benefits: service.benefits.join('\n')
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      longDescription: '',
      included: '',
      benefits: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Service Management</h1>
          <p className="text-gray-600">Manage service types and categories</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-gray-900 mb-6">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="text"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                  placeholder="$49.99"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  required
                  placeholder="30 mins"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="longDescription" className="block text-sm text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="longDescription"
                value={formData.longDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="included" className="block text-sm text-gray-700 mb-2">
                What's Included (one per line)
              </label>
              <textarea
                id="included"
                value={formData.included}
                onChange={(e) => setFormData(prev => ({ ...prev, included: e.target.value }))}
                rows={4}
                placeholder="Oil filter replacement&#10;Fluid level check&#10;Multi-point inspection"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="benefits" className="block text-sm text-gray-700 mb-2">
                Benefits (one per line)
              </label>
              <textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                rows={4}
                placeholder="Extended engine life&#10;Better fuel economy&#10;Peace of mind"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {editingId ? 'Update Service' : 'Add Service'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-gray-900">{service.name}</h3>
                  <span className="text-blue-600">{service.price}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{service.duration}</span>
                </div>
                <p className="text-gray-600 mb-3">{service.description}</p>
                
                {service.included && service.included.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 mb-1">Includes:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {service.included.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                      {service.included.length > 3 && (
                        <li className="text-gray-500">+{service.included.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit service"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${service.name}"?`)) {
                      onDeleteService(service.id);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete service"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !isAdding && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <h3 className="text-gray-900 mb-2">No Services Yet</h3>
          <p className="text-gray-600 mb-6">Add your first service to get started</p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>
      )}
    </div>
  );
}