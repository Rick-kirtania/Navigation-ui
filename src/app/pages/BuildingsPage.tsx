import { useState } from 'react';
import { buildings, Building } from '../data/campusData';
import { BuildingCard } from '../components/BuildingCard';
import { Search, MapPin } from 'lucide-react';

export function BuildingsPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    building.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    building.departments.some(dept => dept.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Campus Buildings</h1>
        <p className="text-gray-600">Browse all buildings and facilities on campus</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search buildings..."
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>
      </div>

      {/* Buildings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuildings.map((building) => (
          <div
            key={building.id}
            onClick={() => setSelectedBuilding(building)}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
          >
            {/* Building Header */}
            <div
              className="p-6 text-white relative"
              style={{ backgroundColor: building.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl">{building.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{building.shortName}</h3>
                </div>
              </div>
              <p className="text-sm text-white/90">{building.description}</p>
            </div>

            {/* Building Info */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Departments</h4>
                <div className="flex flex-wrap gap-2">
                  {building.departments.map((dept) => (
                    <span
                      key={dept}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{building.rooms.length} rooms</span>
                </div>
                <button className="text-sky-600 hover:text-sky-700 font-medium group-hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredBuildings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">No buildings found matching "{searchQuery}"</p>
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
