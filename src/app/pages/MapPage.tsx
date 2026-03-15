import { useState } from 'react';
import { CampusMap } from '../components/CampusMap';
import { BuildingCard } from '../components/BuildingCard';
import { buildings, Building } from '../data/campusData';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

export function MapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Campus Map</h1>
        <p className="text-gray-600">Interactive map of Swami Vivekananda University campus</p>
      </div>

      {/* Map Controls */}
      <div className="mb-4 flex gap-3">
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
        >
          <Maximize2 className="w-4 h-4" />
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2">
          <ZoomIn className="w-4 h-4" />
          Zoom In
        </button>
        <button className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2">
          <ZoomOut className="w-4 h-4" />
          Zoom Out
        </button>
      </div>

      {/* Map Container */}
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${isFullscreen ? 'fixed inset-4 z-40' : ''}`}>
        <div className={isFullscreen ? 'h-[calc(100vh-6rem)]' : 'h-[700px]'}>
          <CampusMap
            buildings={buildings}
            onBuildingClick={setSelectedBuilding}
            selectedBuilding={selectedBuilding || undefined}
          />
        </div>
      </div>

      {/* Building Info Sidebar */}
      {selectedBuilding && !isFullscreen && (
        <div className="mt-6">
          <div className="max-w-4xl mx-auto">
            <BuildingCard
              building={selectedBuilding}
              onClose={() => setSelectedBuilding(null)}
            />
          </div>
        </div>
      )}

      {/* Building Detail Modal (Fullscreen mode) */}
      {selectedBuilding && isFullscreen && (
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
