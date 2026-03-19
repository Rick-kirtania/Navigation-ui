import { Search, Map, AlertCircle, Calendar, ShieldCheck,LogIn, Menu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { universityInfo } from '../data/campusData';

interface TopNavProps {
  onSearch: (query: string) => void;
  isEventMode: boolean;
  onEventModeToggle: () => void;
  onMenuToggle: () => void;
}

export function TopNav({ onSearch, isEventMode, onEventModeToggle, onMenuToggle }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white shadow-sm">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 md:px-6 py-2">
        <div className="w-full flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="hidden sm:inline">📧 {universityInfo.email}</span>
            <span>📞 {universityInfo.phone}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs opacity-90 hidden md:block">{universityInfo.motto}</div>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors text-xs font-medium"
              title="Login"
            >
              <LogIn className="w-3 h-3" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="px-4 md:px-6 py-4">
        <div className="w-full flex items-center justify-between gap-3 md:gap-6">
            {/* Hamburger Menu Button + Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Hamburger Button */}
            <button
              onClick={onMenuToggle}
              className="p-2 hover:bg-sky-50 rounded-lg transition-colors group"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700 group-hover:text-sky-600" />
            </button>

            {/* Logo and Title */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-xl md:text-2xl shadow-md">
                🎓
              </div>
              <div>
                <h1 className="text-sm md:text-xl font-semibold text-gray-800">SVU Smart Campus Navigator</h1>
                <p className="text-xs text-gray-500 hidden sm:block">{universityInfo.name}</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Library, CSE Block, Hostel..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 md:p-3 hover:bg-sky-50 rounded-full transition-colors group"
              title="View Campus Map"
            >
              <Map className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-sky-600" />
            </button>
            
            <button
              onClick={onEventModeToggle}
              className={`p-2 md:p-3 rounded-full transition-all ${
                isEventMode 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'hover:bg-sky-50 text-gray-600 hover:text-sky-600'
              }`}
              title="Event Mode"
            >
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <button
              onClick={() => navigate('/emergency')}
              className="p-2 md:p-3 hover:bg-red-50 rounded-full transition-colors group"
              title="Emergency Help"
            >
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-red-600" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buildings..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-sky-400 transition-colors text-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}