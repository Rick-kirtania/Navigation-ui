import { useState } from 'react';
import { CampusMap } from '../components/CampusMap';
import { buildings, eventLocations } from '../data/campusData';
import { Calendar, MapPin, Info } from 'lucide-react';

export function EventModePage() {
  const [showMap, setShowMap] = useState(true);

  const eventCategories = [
    { icon: '🎭', name: 'Event Halls', count: 2, color: 'purple' },
    { icon: '🎪', name: 'Stalls', count: 25, color: 'pink' },
    { icon: '🍔', name: 'Food Zones', count: 2, color: 'orange' },
    { icon: '🚻', name: 'Facilities', count: 2, color: 'cyan' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Calendar className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Event Mode</h1>
            <p className="text-purple-100 mt-1">Special navigation for campus events and festivals</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {eventCategories.map((category) => (
            <div key={category.name} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm opacity-90">{category.count} locations</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle View */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setShowMap(true)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            showMap
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MapPin className="w-5 h-5 inline mr-2" />
          Map View
        </button>
        <button
          onClick={() => setShowMap(false)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            !showMap
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Info className="w-5 h-5 inline mr-2" />
          List View
        </button>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Locations Map</h2>
          <div className="h-[600px]">
            <CampusMap
              buildings={buildings}
              eventLocations={eventLocations}
              onBuildingClick={() => {}}
              isEventMode={true}
            />
          </div>
        </div>
      )}

      {/* List View */}
      {!showMap && (
        <div className="space-y-6">
          {/* Event Halls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎭</span>
              Event Halls
            </h2>
            <div className="space-y-4">
              {eventLocations.filter(loc => loc.type === 'hall').map((location) => (
                <div key={location.id} className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stalls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🎪</span>
              Exhibition Stalls
            </h2>
            <div className="space-y-4">
              {eventLocations.filter(loc => loc.type === 'stall').map((location) => (
                <div key={location.id} className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
                  <h3 className="font-semibold text-gray-800 mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Food Zones */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🍔</span>
              Food & Refreshments
            </h2>
            <div className="space-y-4">
              {eventLocations.filter(loc => loc.type === 'food').map((location) => (
                <div key={location.id} className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                  <h3 className="font-semibold text-gray-800 mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Washrooms */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-3xl">🚻</span>
              Washroom Facilities
            </h2>
            <div className="space-y-4">
              {eventLocations.filter(loc => loc.type === 'washroom').map((location) => (
                <div key={location.id} className="bg-cyan-50 rounded-lg p-4 border-2 border-cyan-200">
                  <h3 className="font-semibold text-gray-800 mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event Info */}
      <div className="mt-6 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">📅 Event Details</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Event: SVU Tech Fest 2026</li>
              <li>• Date: February 20-22, 2026</li>
              <li>• Timing: 9:00 AM - 6:00 PM</li>
              <li>• Expected Attendees: 2000+</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">ℹ️ Important Information</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Entry passes required</li>
              <li>• Follow event guidelines</li>
              <li>• Emergency exits marked on map</li>
              <li>• Help desk at Main Auditorium</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
