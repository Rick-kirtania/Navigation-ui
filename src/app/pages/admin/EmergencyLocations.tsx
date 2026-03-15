import { useState } from 'react';
import { AlertTriangle, Plus, Pencil, Trash2, X, Phone, MapPin } from 'lucide-react';
import { emergencyContacts as initialContacts } from '../../data/campusData';

export function EmergencyLocations() {
  const [contacts, setContacts] = useState(initialContacts);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    phone: '',
    location: '',
    category: 'Medical',
    priority: 'High',
    available: '24/7'
  });

  const categories = ['Medical', 'Security', 'Fire Safety', 'Ambulance', 'Other'];
  const priorityLevels = ['High', 'Medium', 'Low'];

  const handleOpenModal = (contact?: any) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        title: contact.title,
        phone: contact.phone,
        location: contact.location,
        category: contact.title.includes('Medical') ? 'Medical' : 
                 contact.title.includes('Security') ? 'Security' :
                 contact.title.includes('Fire') ? 'Fire Safety' : 'Other',
        priority: 'High',
        available: '24/7'
      });
    } else {
      setEditingContact(null);
      setFormData({
        title: '',
        phone: '',
        location: '',
        category: 'Medical',
        priority: 'High',
        available: '24/7'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      console.log('Updating emergency contact:', formData);
    } else {
      console.log('Adding new emergency contact:', formData);
    }
    handleCloseModal();
  };

  const handleDelete = (contactId: string) => {
    if (confirm('Are you sure you want to delete this emergency contact?')) {
      setContacts(contacts.filter(c => c.id !== contactId));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Medical': return 'bg-red-500';
      case 'Security': return 'bg-blue-500';
      case 'Fire Safety': return 'bg-orange-500';
      case 'Ambulance': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Red Theme Accent */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Emergency Locations</h1>
          </div>
          <p className="text-gray-500 mt-1 ml-10">Manage emergency contacts and services</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Emergency Location
        </button>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Important Notice</h3>
            <p className="text-sm text-red-700 mt-1">
              Emergency contacts are critical for campus safety. Please ensure all information is accurate and up-to-date.
              These contacts will be displayed to users during emergency mode.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow-sm border-2 border-red-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-red-50 px-6 py-4 border-b-2 border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{contact.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{contact.title}</h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 mt-1">
                      Priority: High
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Emergency Hotline</p>
                  <p className="font-semibold text-gray-900 text-lg">{contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Location</p>
                  <p className="text-sm text-gray-900">{contact.location}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  24/7 Available
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(contact)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Emergency Location Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-red-50">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingContact ? 'Edit Emergency Location' : 'Add Emergency Location'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {editingContact ? 'Update emergency contact information' : 'Enter emergency contact details'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Medical Emergency"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {priorityLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="+91-XXXXXXXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Medical Center, Ground Floor"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., 24/7 or 9 AM - 5 PM"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {editingContact ? 'Update Location' : 'Add Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
