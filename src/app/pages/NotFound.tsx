import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center">
        <div className="text-9xl mb-4">🗺️</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you've wandered off the campus map! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
