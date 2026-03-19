import { Outlet, Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  User
} from 'lucide-react';
import { useState } from 'react';

export function AdminLayout() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { path: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    { path: '/admin/buildings', label: 'Manage Buildings', icon: Building2 },
    { path: '/admin/events', label: 'Manage Events', icon: Calendar },
    { path: '/admin/emergency', label: 'Emergency Locations', icon: AlertTriangle },
    { path: '/admin/markers', label: 'Map Marker Control', icon: MapPin },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">SVU Smart Campus Navigator</h1>
              <p className="text-sm text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded text-sm">
                      <p className="font-medium text-blue-900">New building added</p>
                      <p className="text-blue-700 text-xs">2 hours ago</p>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-sm">
                      <p className="font-medium text-green-900">Event updated successfully</p>
                      <p className="text-green-700 text-xs">5 hours ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>

            {/* Logout */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
