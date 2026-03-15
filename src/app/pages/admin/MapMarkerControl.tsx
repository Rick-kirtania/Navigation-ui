import { useState } from 'react';
import { MapPin, Eye, EyeOff, RefreshCw, Save } from 'lucide-react';
import { buildings } from '../../data/campusData';

export function MapMarkerControl() {
  const [markers, setMarkers] = useState(
    buildings.map(building => ({
      id: building.id,
      name: building.name,
      icon: building.icon,
      color: building.color,
      position: building.position,
      visible: true,
      category: building.departments[0] || 'General'
    }))
  );

  const toggleMarkerVisibility = (markerId: string) => {
    setMarkers(markers.map(marker =>
      marker.id === markerId ? { ...marker, visible: !marker.visible } : marker
    ));
  };

  const toggleAllMarkers = (visible: boolean) => {
    setMarkers(markers.map(marker => ({ ...marker, visible })));
  };

  const handleSaveChanges = () => {
    console.log('Saving marker configuration:', markers);
    alert('Marker configuration saved successfully!');
  };

  const visibleCount = markers.filter(m => m.visible).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Map Marker Control</h1>
        <p className="text-gray-500 mt-1">Toggle visibility and manage map markers</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Markers</p>
            <p className="text-3xl font-bold text-gray-900">{markers.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Visible Markers</p>
            <p className="text-3xl font-bold text-green-600">{visibleCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hidden Markers</p>
            <p className="text-3xl font-bold text-red-600">{markers.length - visibleCount}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleAllMarkers(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Show All
            </button>
            <button
              onClick={() => toggleAllMarkers(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Hide All
            </button>
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Marker List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Campus Markers</h2>
          
          {markers.map((marker) => (
            <div
              key={marker.id}
              className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all ${
                marker.visible ? 'border-green-200' : 'border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Marker Icon */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: marker.color + '20' }}
                  >
                    {marker.icon}
                  </div>

                  {/* Marker Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{marker.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">
                        Position: ({marker.position.x}, {marker.position.y})
                      </span>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {marker.category}
                      </span>
                    </div>
                  </div>

                  {/* Visibility Badge */}
                  <div className="flex items-center gap-2">
                    {marker.visible ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <Eye className="w-3 h-3" />
                        Visible
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        <EyeOff className="w-3 h-3" />
                        Hidden
                      </span>
                    )}
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleMarkerVisibility(marker.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      marker.visible
                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {marker.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Map Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Map Preview</h2>
            
            {/* Mini Map */}
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-200 aspect-square">
              {/* Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                  backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Markers */}
              {markers.filter(m => m.visible).map((marker) => (
                <div
                  key={marker.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 cursor-pointer"
                  style={{
                    left: `${marker.position.x}%`,
                    top: `${marker.position.y}%`,
                  }}
                  title={marker.name}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    style={{ backgroundColor: marker.color }}
                  >
                    <span className="text-sm">{marker.icon}</span>
                  </div>
                </div>
              ))}

              {/* Compass */}
              <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg">
                <div className="w-8 h-8 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-900">
                <RefreshCw className="w-4 h-4" />
                <span className="font-medium">Live Preview</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                This preview updates in real-time as you toggle markers
              </p>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">Legend</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Administrative</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Academic</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Emergency</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span>Residential</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
