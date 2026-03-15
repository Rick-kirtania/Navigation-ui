import { Home, Map, Building2, Calendar, AlertCircle, Info, X } from 'lucide-react';
import { Link, useLocation } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/map', icon: Map, label: 'Campus Map' },
    { path: '/buildings', icon: Building2, label: 'Buildings' },
    { path: '/event-mode', icon: Calendar, label: 'Event Mode' },
    { path: '/emergency', icon: AlertCircle, label: 'Emergency Help' },
    { path: '/about', icon: Info, label: 'About SVU' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col rounded-r-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Close Button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">Navigation</h2>
            <p className="text-xs text-gray-500 mt-1">SVU Campus</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-6 py-3 transition-all ${
                  isActive
                    ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-sky-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>SVU Smart Campus</p>
            <p className="mt-1">Navigator v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}