import { universityInfo } from '../data/campusData';
import { Mail, Phone, Globe, Calendar, Award, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="p-6">
      {/* University Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-5xl">
            🎓
          </div>
          <div>
            <h1 className="text-3xl font-bold">{universityInfo.name}</h1>
            <p className="text-sky-100 mt-1">{universityInfo.location}</p>
          </div>
        </div>
        <div className="bg-sky-600/50 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-lg font-semibold">"{universityInfo.motto}"</p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <Calendar className="w-8 h-8 text-sky-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Established</h3>
          <p className="text-2xl font-bold text-sky-600">{universityInfo.established}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <Users className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Students</h3>
          <p className="text-2xl font-bold text-purple-600">5,000+</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <Award className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">Departments</h3>
          <p className="text-2xl font-bold text-emerald-600">12+</p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About the University</h2>
        <div className="prose max-w-none text-gray-700 space-y-4">
          <p>
            Swami Vivekananda University, located in Barrackpore, West Bengal, is a premier educational institution 
            dedicated to providing quality education and fostering innovation. Established in {universityInfo.established}, 
            the university has grown to become a center of academic excellence in the region.
          </p>
          <p>
            Our campus is equipped with state-of-the-art facilities including modern classrooms, well-equipped laboratories, 
            a comprehensive library, sports facilities, and comfortable hostel accommodations. We offer a wide range of 
            undergraduate and postgraduate programs across various disciplines.
          </p>
          <p>
            The university is committed to holistic development of students through a combination of academic rigor, 
            research opportunities, extracurricular activities, and industry collaboration. Our faculty comprises 
            experienced educators and researchers who are dedicated to nurturing the next generation of leaders.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
              <a href={`mailto:${universityInfo.email}`} className="text-sky-600 hover:underline">
                {universityInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
              <a href={`tel:${universityInfo.phone}`} className="text-purple-600 hover:underline">
                {universityInfo.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Website</h3>
              <a href={`https://${universityInfo.website}`} className="text-emerald-600 hover:underline">
                {universityInfo.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Smart Navigator */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Smart Campus Navigator</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            The SVU Smart Campus Navigator is an innovative digital solution designed to help students, faculty, 
            and visitors navigate our extensive campus with ease. This platform provides real-time information 
            about building locations, room assignments, faculty details, and emergency services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">🗺️ Key Features</h3>
              <ul className="text-sm space-y-1">
                <li>• Interactive campus map</li>
                <li>• Building and room finder</li>
                <li>• Faculty directory</li>
                <li>• Emergency services access</li>
                <li>• Event mode for campus festivals</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">💡 Benefits</h3>
              <ul className="text-sm space-y-1">
                <li>• Easy navigation for new students</li>
                <li>• Quick access to information</li>
                <li>• Enhanced campus security</li>
                <li>• Better event management</li>
                <li>• Time-saving and efficient</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
