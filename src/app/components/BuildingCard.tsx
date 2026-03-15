import { Building } from '../data/campusData';
import { X, MapPin, Users, DoorOpen } from 'lucide-react';

interface BuildingCardProps {
  building: Building;
  onClose: () => void;
}

export function BuildingCard({ building, onClose }: BuildingCardProps) {
  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'classroom': return '🎓';
      case 'lab': return '🔬';
      case 'office': return '💼';
      case 'common': return '🏢';
      default: return '📍';
    }
  };

  const getRoomTypeName = (type: string) => {
    switch (type) {
      case 'classroom': return 'Classroom';
      case 'lab': return 'Laboratory';
      case 'office': return 'Office';
      case 'common': return 'Common Area';
      default: return 'Room';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col">
      {/* Header */}
      <div 
        className="p-6 text-white relative"
        style={{ backgroundColor: building.color }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="text-5xl">{building.icon}</div>
          <div>
            <h2 className="text-2xl font-bold">{building.name}</h2>
            <p className="text-white/90 mt-1">{building.description}</p>
          </div>
        </div>

        {/* Departments */}
        <div className="mt-4 flex flex-wrap gap-2">
          {building.departments.map((dept) => (
            <span
              key={dept}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
            >
              {dept}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-sky-50 rounded-lg p-4 text-center">
            <DoorOpen className="w-6 h-6 text-sky-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{building.rooms.length}</div>
            <div className="text-xs text-gray-600">Total Rooms</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{building.departments.length}</div>
            <div className="text-xs text-gray-600">Departments</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 text-center">
            <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">Active</div>
            <div className="text-xs text-gray-600">Status</div>
          </div>
        </div>

        {/* Room Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DoorOpen className="w-5 h-5 text-sky-600" />
            Room Details
          </h3>
          
          <div className="space-y-3">
            {building.rooms.map((room) => (
              <div
                key={room.id}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{getRoomIcon(room.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">
                        Room {room.number}
                      </span>
                      <span className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-gray-200">
                        {getRoomTypeName(room.type)}
                      </span>
                    </div>
                    
                    {room.department && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Department:</span> {room.department}
                      </p>
                    )}
                    
                    {room.assignedTo && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Assigned to:</span> {room.assignedTo}
                      </p>
                    )}
                    
                    {room.capacity && (
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Capacity:</span> {room.capacity} persons
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium"
        >
          Close Details
        </button>
      </div>
    </div>
  );
}
