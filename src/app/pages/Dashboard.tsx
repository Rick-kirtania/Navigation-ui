import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { CampusMap } from '../components/CampusMap';
import { BuildingCard } from '../components/BuildingCard';
import { buildings, eventLocations } from '../data/campusData';
import { Building } from '../data/campusData';
import { TrendingUp, Users, MapPin, Calendar } from 'lucide-react';

interface DashboardContext {
  isEventMode: boolean;
}

export function Dashboard() {
  const { isEventMode } = useOutletContext<DashboardContext>();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const stats = [
    {
      icon: MapPin,
      label: 'Campus Buildings',
      value: buildings.length.toString(),
      color: 'bg-sky-50 text-sky-600',
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '2,847',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Calendar,
      label: 'Upcoming Events',
      value: '12',
      color: 'bg-pink-50 text-pink-600',
    },
    {
      icon: TrendingUp,
      label: 'System Status',
      value: 'Online',
      color: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to SVU Smart Campus Navigator
        </h1>
        <p className="text-sky-100">
          Navigate through Swami Vivekananda University campus with ease. Locate buildings, find rooms, and access emergency services.
        </p>
      </div>

      {/* 🔥 Stats Grid - Animated Version */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group bg-white rounded-xl p-6 shadow-md
              hover:shadow-2xl hover:-translate-y-2 hover:scale-105
              hover:ring-2 hover:ring-sky-400
              transition-all duration-300 ease-in-out
              cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-lg ${stat.color}
                flex items-center justify-center mb-4
                transition-all duration-300
                group-hover:scale-110 group-hover:rotate-6`}
              >
                <Icon className="w-6 h-6 transition-transform duration-300" />
              </div>

              <div className="text-3xl font-bold text-gray-800 mb-1 transition-colors duration-300 group-hover:text-sky-600">
                {stat.value}
              </div>

              <div className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEventMode ? 'Event Mode - Campus Map' : 'Interactive Campus Map'}
          </h2>
          {isEventMode && (
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              🎉 Event Mode Active
            </span>
          )}
        </div>
        
        <div className="h-[600px]">
          <CampusMap
            buildings={buildings}
            eventLocations={eventLocations}
            onBuildingClick={setSelectedBuilding}
            selectedBuilding={selectedBuilding || undefined}
            isEventMode={isEventMode}
          />
        </div>
      </div>
    {/* Quick Access Cards */}
      {!isEventMode && (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
  {/* Most Visited */}
  <div className="group bg-white rounded-xl p-6 shadow-md 
  hover:shadow-2xl hover:-translate-y-2 hover:scale-105
  hover:ring-2 hover:ring-sky-400
  transition-all duration-300 ease-in-out
  border-l-4 border-sky-500 cursor-pointer">

    <h3 className="font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-sky-600">
      📚 Most Visited
    </h3>

    <p className="text-sm text-gray-600 mb-3">
      Top locations on campus
    </p>

    <ul className="space-y-2 text-sm">
      <li className="flex justify-between transition-all duration-300 hover:translate-x-2">
        <span className="text-gray-700">Library</span>
        <span className="text-gray-500">854 visits</span>
      </li>
      <li className="flex justify-between transition-all duration-300 hover:translate-x-2">
        <span className="text-gray-700">CSE Block</span>
        <span className="text-gray-500">742 visits</span>
      </li>
      <li className="flex justify-between transition-all duration-300 hover:translate-x-2">
        <span className="text-gray-700">Canteen</span>
        <span className="text-gray-500">698 visits</span>
      </li>
    </ul>
  </div>


  {/* Quick Links */}
  <div className="group bg-white rounded-xl p-6 shadow-md 
  hover:shadow-2xl hover:-translate-y-2 hover:scale-105
  hover:ring-2 hover:ring-purple-400
  transition-all duration-300 ease-in-out
  border-l-4 border-purple-500 cursor-pointer">

    <h3 className="font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-purple-600">
      🎯 Quick Links
    </h3>

    <p className="text-sm text-gray-600 mb-3">
      Frequently accessed
    </p>

    <ul className="space-y-2 text-sm">
      <li className="text-sky-600 transition-all duration-300 hover:translate-x-2 hover:underline cursor-pointer">
        Find Classroom
      </li>
      <li className="text-sky-600 transition-all duration-300 hover:translate-x-2 hover:underline cursor-pointer">
        Faculty Directory
      </li>
      <li className="text-sky-600 transition-all duration-300 hover:translate-x-2 hover:underline cursor-pointer">
        Campus Events
      </li>
    </ul>
  </div>


  {/* Announcements */}
  <div className="group bg-white rounded-xl p-6 shadow-md 
  hover:shadow-2xl hover:-translate-y-2 hover:scale-105
  hover:ring-2 hover:ring-emerald-400
  transition-all duration-300 ease-in-out
  border-l-4 border-emerald-500 cursor-pointer">

    <h3 className="font-semibold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-emerald-600">
      📢 Announcements
    </h3>

    <p className="text-sm text-gray-600 mb-3">
      Latest updates
    </p>

    <ul className="space-y-2 text-sm text-gray-700">
      <li className="transition-all duration-300 hover:translate-x-2">
        • Tech Fest 2026 - Feb 20-22
      </li>
      <li className="transition-all duration-300 hover:translate-x-2">
        • Library extended hours
      </li>
      <li className="transition-all duration-300 hover:translate-x-2">
        • New CSE Lab inaugurated
      </li>
    </ul>
  </div>

</div>
      )}

      {/* Event Mode Info */}
      {isEventMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="text-3xl mb-2">🎭</div>
            <div className="text-lg font-semibold text-gray-800">Event Halls</div>
            <div className="text-sm text-gray-600">2 venues available</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-6 border-2 border-pink-200">
            <div className="text-3xl mb-2">🎪</div>
            <div className="text-lg font-semibold text-gray-800">Stalls</div>
            <div className="text-sm text-gray-600">25 stalls setup</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
            <div className="text-3xl mb-2">🍔</div>
            <div className="text-lg font-semibold text-gray-800">Food Zones</div>
            <div className="text-sm text-gray-600">2 zones active</div>
          </div>
          <div className="bg-cyan-50 rounded-xl p-6 border-2 border-cyan-200">
            <div className="text-3xl mb-2">🚻</div>
            <div className="text-lg font-semibold text-gray-800">Facilities</div>
            <div className="text-sm text-gray-600">2 washroom blocks</div>
          </div>
        </div>
      )}

      {/* Building Detail Modal */}
      {selectedBuilding && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <BuildingCard
            building={selectedBuilding}
            onClose={() => setSelectedBuilding(null)}
          />
        </div>
      )}
    </div>
  );
}
