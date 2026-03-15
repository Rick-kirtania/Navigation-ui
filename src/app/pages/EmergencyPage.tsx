import { emergencyContacts } from '../data/campusData';
import { Phone, MapPin, AlertCircle, Navigation } from 'lucide-react';

export function EmergencyPage() {
  return (
    <div className="p-6">
      {/* Alert Banner */}
      <div className="bg-red-500 text-white rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <AlertCircle className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Emergency Help</h1>
            <p className="text-red-100 mt-1">Quick access to emergency services on campus</p>
          </div>
        </div>
        <div className="bg-red-600/50 rounded-lg p-4 backdrop-blur-sm">
          <p className="font-semibold">⚠️ In case of emergency, call the nearest contact immediately</p>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-l-4 border-red-500"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-5xl">{contact.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {contact.title}
                  </h3>
                  
                  <div className="space-y-3">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold"
                    >
                      <Phone className="w-5 h-5" />
                      {contact.phone}
                    </a>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      {contact.location}
                    </div>
                  </div>

                  <button className="mt-4 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Guidelines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Safety Guidelines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🏥 Medical Emergency
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Stay calm and assess the situation</li>
              <li>• Call Medical Center immediately</li>
              <li>• Provide clear location information</li>
              <li>• Do not move injured person unless necessary</li>
              <li>• Wait for medical help to arrive</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🚒 Fire Emergency
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Activate nearest fire alarm</li>
              <li>• Call Fire Safety immediately</li>
              <li>• Evacuate the building calmly</li>
              <li>• Use stairs, not elevators</li>
              <li>• Gather at designated assembly point</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👮 Security Concerns
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Report suspicious activity immediately</li>
              <li>• Contact Security Office</li>
              <li>• Note details: time, location, description</li>
              <li>• Stay in safe location</li>
              <li>• Follow security personnel instructions</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🚨 General Emergency
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Keep emergency numbers saved</li>
              <li>• Know your current location</li>
              <li>• Follow staff instructions</li>
              <li>• Help others if safe to do so</li>
              <li>• Report all incidents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Assembly Points */}
      <div className="mt-6 bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Navigation className="w-6 h-6 text-orange-600" />
          Emergency Assembly Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-gray-800">Main Ground</p>
            <p className="text-sm text-gray-600">Near Main Gate</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-gray-800">Sports Field</p>
            <p className="text-sm text-gray-600">Behind Library</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="font-semibold text-gray-800">Parking Area</p>
            <p className="text-sm text-gray-600">East Wing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
