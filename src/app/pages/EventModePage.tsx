import { useState } from 'react';
import { CampusMap } from '../components/CampusMap';
import { buildings, eventLocations } from '../data/campusData';
import { Calendar, MapPin, Info, Clock, Users, Tag, Trophy, Music, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock event data
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: 'ongoing' | 'upcoming' | 'previous';
  capacity?: string;
  tags: string[];
  color: 'purple' | 'pink' | 'blue' | 'cyan' | 'orange' | 'green';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Symposium 2026',
    description: 'Annual technical symposium featuring latest innovations in AI and Machine Learning',
    date: 'March 20, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    status: 'ongoing',
    capacity: '500 attendees',
    tags: ['Tech', 'AI'],
    color: 'purple'
  },
  {
    id: '2',
    title: 'Cultural Fest - Harmony',
    description: 'Inter-college cultural festival with dance, music, and drama competitions',
    date: 'March 20, 2026',
    time: '2:00 PM - 8:00 PM',
    location: 'Open Air Theatre',
    status: 'ongoing',
    capacity: '1000 attendees',
    tags: ['Cultural', 'Music'],
    color: 'pink'
  },
  {
    id: '3',
    title: 'Startup Pitch Competition',
    description: 'Student entrepreneurs showcase their innovative startup ideas to industry experts',
    date: 'March 25, 2026',
    time: '11:00 AM - 3:00 PM',
    location: 'Seminar Hall A',
    status: 'upcoming',
    capacity: '200 attendees',
    tags: ['Business', 'Innovation'],
    color: 'blue'
  },
  {
    id: '4',
    title: 'Art Exhibition',
    description: 'Showcase of student artworks including paintings, sculptures, and digital art',
    date: 'March 28, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'Art Gallery',
    status: 'upcoming',
    capacity: '300 attendees',
    tags: ['Art', 'Creative'],
    color: 'orange'
  },
  {
    id: '5',
    title: 'Sports Meet 2026',
    description: 'Annual inter-departmental sports competition with multiple athletic events',
    date: 'April 5, 2026',
    time: '8:00 AM - 5:00 PM',
    location: 'Sports Complex',
    status: 'upcoming',
    capacity: '800 attendees',
    tags: ['Sports', 'Athletics'],
    color: 'green'
  },
  {
    id: '6',
    title: 'Robotics Workshop',
    description: 'Hands-on workshop on building and programming autonomous robots',
    date: 'April 10, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Engineering Block',
    status: 'upcoming',
    capacity: '100 attendees',
    tags: ['Tech', 'Robotics'],
    color: 'cyan'
  },
  {
    id: '7',
    title: 'Science Exhibition',
    description: 'Annual science fair displaying innovative student projects and research',
    date: 'March 15, 2026',
    time: '9:00 AM - 5:00 PM',
    location: 'Science Block',
    status: 'previous',
    capacity: '600 attendees',
    tags: ['Science', 'Research'],
    color: 'purple'
  },
  {
    id: '8',
    title: 'Winter Music Concert',
    description: 'Musical evening featuring college band and guest performances',
    date: 'March 10, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Main Auditorium',
    status: 'previous',
    capacity: '500 attendees',
    tags: ['Music', 'Entertainment'],
    color: 'pink'
  },
  {
    id: '9',
    title: 'Career Fair 2026',
    description: 'Meet leading companies and explore career opportunities and internships',
    date: 'March 8, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Convention Center',
    status: 'previous',
    capacity: '1200 attendees',
    tags: ['Career', 'Networking'],
    color: 'blue'
  }
];

type EventTab = 'ongoing' | 'upcoming' | 'previous';

export function EventModePage() {
  const [showMap, setShowMap] = useState(true);
  const [activeTab, setActiveTab] = useState<EventTab>('ongoing');

  const eventCategories = [
    { icon: '🎭', name: 'Event Halls', count: 2, color: 'purple' },
    { icon: '🎪', name: 'Stalls', count: 25, color: 'pink' },
    { icon: '🍔', name: 'Food Zones', count: 2, color: 'orange' },
    { icon: '🚻', name: 'Facilities', count: 2, color: 'cyan' },
  ];

  const filteredEvents = mockEvents.filter(event => event.status === activeTab);

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'upcoming':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'previous':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getColorStyles = (color: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-50 border-purple-200 hover:border-purple-300';
      case 'pink':
        return 'bg-pink-50 border-pink-200 hover:border-pink-300';
      case 'blue':
        return 'bg-blue-50 border-blue-200 hover:border-blue-300';
      case 'cyan':
        return 'bg-cyan-50 border-cyan-200 hover:border-cyan-300';
      case 'orange':
        return 'bg-orange-50 border-orange-200 hover:border-orange-300';
      case 'green':
        return 'bg-green-50 border-green-200 hover:border-green-300';
      default:
        return 'bg-gray-50 border-gray-200 hover:border-gray-300';
    }
  };

  const getTagIcon = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('tech') || lowerTag.includes('ai') || lowerTag.includes('robotics')) {
      return <Tag className="w-3 h-3" />;
    }
    if (lowerTag.includes('music') || lowerTag.includes('cultural')) {
      return <Music className="w-3 h-3" />;
    }
    if (lowerTag.includes('sports') || lowerTag.includes('athletics')) {
      return <Trophy className="w-3 h-3" />;
    }
    if (lowerTag.includes('art') || lowerTag.includes('creative')) {
      return <Palette className="w-3 h-3" />;
    }
    return <Tag className="w-3 h-3" />;
  };

  return (
    <div className="w-auto mx-auto px-6 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Calendar className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">Event Mode</h1>
            <p className="text-purple-100 mt-1">Special navigation for campus events and festivals</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {eventCategories.map((category) => (
            <div key={category.name} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
              <div className="text-sm opacity-90">{category.count} locations</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle View */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setShowMap(true)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            showMap
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MapPin className="w-5 h-5 inline mr-2" />
          Map View
        </button>
        <button
          onClick={() => setShowMap(false)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            !showMap
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Info className="w-5 h-5 inline mr-2" />
          Events
        </button>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Locations Map</h2>
          <div className="h-[600px]">
            <CampusMap
              buildings={buildings}
              eventLocations={eventLocations}
              onBuildingClick={() => {}}
              isEventMode={true}
            />
          </div>
        </div>
      )}

      {/* List View */}
      {!showMap && (
        <div className="space-y-6">
          {/* Tab Switcher */}
          <div className="bg-white rounded-2xl shadow-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'ongoing'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeTab === 'ongoing' ? 'bg-white' : 'bg-green-500'}`}></div>
                Ongoing Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Upcoming Events
              </div>
            </button>
            <button
              onClick={() => setActiveTab('previous')}
              className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'previous'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Info className="w-4 h-4" />
                Previous Events
              </div>
            </button>
          </div>

          {/* Events List with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredEvents.length === 0 ? (
                // Empty State
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-12 text-center"
                >
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No {activeTab} events
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'ongoing' && "There are no events happening right now. Check upcoming events!"}
                    {activeTab === 'upcoming' && "No events scheduled yet. Stay tuned for announcements!"}
                    {activeTab === 'previous' && "No past events to display."}
                  </p>
                </motion.div>
              ) : (
                // Event Cards
                <div className="grid gap-4">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`${getColorStyles(event.color)} rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Left Section - Event Details */}
                        <div className="flex-1 space-y-3">
                          {/* Title and Status Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-xl font-bold text-gray-800">
                              {event.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase whitespace-nowrap ${getStatusBadgeStyles(event.status)}`}>
                              {event.status}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Event Meta Information */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Calendar className="w-4 h-4 text-purple-600" />
                              <span className="font-medium">{event.date}</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Clock className="w-4 h-4 text-pink-600" />
                              <span className="font-medium">{event.time}</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="font-medium">{event.location}</span>
                            </div>

                            {/* Capacity */}
                            {event.capacity && (
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Users className="w-4 h-4 text-green-600" />
                                <span className="font-medium">{event.capacity}</span>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {event.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-xs font-medium text-gray-700 border border-gray-200"
                              >
                                {getTagIcon(tag)}
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Event Info */}
      <div className="mt-6 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Current Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">📅 Event Details</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Event: SVU Tech Fest 2026</li>
              <li>• Date: February 20-22, 2026</li>
              <li>• Timing: 9:00 AM - 6:00 PM</li>
              <li>• Expected Attendees: 2000+</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">ℹ️ Important Information</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Entry passes required</li>
              <li>• Follow event guidelines</li>
              <li>• Emergency exits marked on map</li>
              <li>• Help desk at Main Auditorium</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}