import { Building2, Calendar, AlertTriangle, MapPin, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export function AdminDashboard() {

  // 🔥 STATE FOR STATS (DYNAMIC)
  const [stats, setStats] = useState([
    {
      title: 'Total Buildings',
      value: '0',
      icon: Building2,
      color: 'bg-blue-500',
      trend: ''
    },
    {
      title: 'Total Events',
      value: '0',
      icon: Calendar,
      color: 'bg-green-500',
      trend: ''
    },
    {
      title: 'Emergency Locations',
      value: '0',
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: ''
    },
    {
      title: 'Active Markers',
      value: '0',
      icon: MapPin,
      color: 'bg-purple-500',
      trend: ''
    }
  ]);

  const { user } = useAuth();

  // 🔥 STATE FOR ACTIVITY
  const [activities, setActivities] = useState<any[]>([]);

  // 🔥 UPDATE FUNCTION
  const updateStat = (index: number, value: number) => {
    setStats(prev => {
      const updated = [...prev];
      updated[index].value = value.toString();
      return updated;
    });
  };

  // 🔥 REAL-TIME FIRESTORE LISTENERS
  useEffect(() => {

    const unsubBuildings = onSnapshot(collection(db, "buildings"), (snap) => {
      updateStat(0, snap.size);
    });

    const unsubEvents = onSnapshot(collection(db, "events"), (snap) => {
      updateStat(1, snap.size);
    });

    const unsubEmergency = onSnapshot(collection(db, "emergency"), (snap) => {
      updateStat(2, snap.size);
    });

    const unsubMarkers = onSnapshot(collection(db, "markers"), (snap) => {
      updateStat(3, snap.size);
    });

    const unsubActivity = onSnapshot(collection(db, "activity"), (snap) => {
      const data = snap.docs.map(doc => doc.data());
      setActivities(data.reverse());
    });

    return () => {
      unsubBuildings();
      unsubEvents();
      unsubEmergency();
      unsubMarkers();
      unsubActivity();
    };

  }, []);

  // 🔥 QUICK ACTIONS (UNCHANGED)
  const quickActions = [
    { label: 'Add New Building', icon: Building2, link: '/admin/buildings', color: 'bg-blue-500 hover:bg-blue-600' },
    { label: 'Add Event', icon: Calendar, link: '/admin/events', color: 'bg-green-500 hover:bg-green-600' },
    { label: 'Add Emergency Location', icon: AlertTriangle, link: '/admin/emergency', color: 'bg-red-500 hover:bg-red-600' }
  ];

  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard! 👋</h1>
            <p className="text-blue-100">Manage your SVU Smart Campus Navigator system efficiently</p>
          </div>

          {/* 🔥 YOU CAN CONNECT LAST LOGIN HERE LATER */}
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-xs text-blue-100">Last Login</p>
              <p className="font-semibold">
  {user?.lastLogin || "No data"}
</p>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <p className="text-xs text-blue-100">Live Data</p>
              <p className="font-semibold">🔥 Connected to Database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-2">{stat.trend}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white rounded-lg p-6 flex items-center gap-4 transition-all shadow-sm hover:shadow-md`}
              >
                <div className="bg-white/20 p-3 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">{action.label}</p>
                  <p className="text-sm opacity-90">Click to manage</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 🔥 REAL-TIME RECENT ACTIVITY */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {activities.length === 0 ? (
            <p className="p-4 text-gray-500 text-sm">No activity yet</p>
          ) : (
            activities.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {activity.time || ""}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}