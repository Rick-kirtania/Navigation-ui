import { useState } from 'react';
import { Building, EventLocation } from '../data/campusData';
import { MapPin, Navigation } from 'lucide-react';

interface CampusMapProps {
  buildings: Building[];
  eventLocations?: EventLocation[];
  onBuildingClick: (building: Building) => void;
  selectedBuilding?: Building;
  isEventMode?: boolean;
}

export function CampusMap({ 
  buildings, 
  eventLocations = [], 
  onBuildingClick, 
  selectedBuilding,
  isEventMode = false 
}: CampusMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'hall': return '🎭';
      case 'stall': return '🎪';
      case 'food': return '🍔';
      case 'washroom': return '🚻';
      default: return '📍';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'hall': return '#8B5CF6';
      case 'stall': return '#EC4899';
      case 'food': return '#F59E0B';
      case 'washroom': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200">
      {/* Map Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        {/* Pathways */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <path
            d="M 15% 50% Q 30% 50%, 45% 50% T 75% 50%"
            stroke="#9CA3AF"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 45% 30% L 45% 70%"
            stroke="#9CA3AF"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20">🌳</div>
        <div className="absolute top-20 right-20 text-3xl opacity-20">🌳</div>
        <div className="absolute bottom-20 left-1/4 text-3xl opacity-20">🌳</div>
        <div className="absolute bottom-10 right-1/3 text-4xl opacity-20">🌳</div>
      </div>

      {/* Compass */}
      <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md">
        <Navigation className="w-5 h-5 text-sky-600" />
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md">
        <p className="text-xs font-semibold text-gray-700 mb-2">
          {isEventMode ? 'Event Locations' : 'Campus Buildings'}
        </p>
        {isEventMode ? (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span>🎭</span>
              <span className="text-gray-600">Event Halls</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>🎪</span>
              <span className="text-gray-600">Stalls</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>🍔</span>
              <span className="text-gray-600">Food Zones</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>🚻</span>
              <span className="text-gray-600">Washrooms</span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-600">
            Click on any building to view details
          </div>
        )}
      </div>

      {/* Building Markers */}
      {!isEventMode && buildings.map((building) => {
        const isSelected = selectedBuilding?.id === building.id;
        const isHovered = hoveredId === building.id;
        
        return (
          <div
            key={building.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
            style={{
              left: `${building.position.x}%`,
              top: `${building.position.y}%`,
              zIndex: isSelected ? 30 : isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setHoveredId(building.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <button
              onClick={() => onBuildingClick(building)}
              className={`relative group ${
                isSelected ? 'scale-125' : isHovered ? 'scale-110' : 'scale-100'
              } transition-transform`}
            >
              {/* Marker Pin */}
              <div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                  isSelected
                    ? 'ring-4 ring-sky-400 ring-offset-2'
                    : isHovered
                    ? 'ring-2 ring-sky-300'
                    : ''
                }`}
                style={{ backgroundColor: building.color }}
              >
                {building.icon}
              </div>
              
              {/* Label */}
              <div
                className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md transition-all ${
                  isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
              >
                <span className="text-xs font-semibold" style={{ color: building.color }}>
                  {building.shortName}
                </span>
              </div>

              {/* Pulse Animation for Selected */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: building.color }}
                />
              )}
            </button>
          </div>
        );
      })}

      {/* Event Location Markers */}
      {isEventMode && eventLocations.map((location) => {
        const isHovered = hoveredId === location.id;
        
        return (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
            style={{
              left: `${location.position.x}%`,
              top: `${location.position.y}%`,
              zIndex: isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setHoveredId(location.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              className={`relative w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition-transform ${
                isHovered ? 'scale-125' : 'scale-100'
              }`}
              style={{ backgroundColor: getEventColor(location.type) }}
            >
              {getEventIcon(location.type)}
              
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg w-48 z-50">
                  <p className="text-xs font-semibold text-gray-800">{location.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{location.description}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
