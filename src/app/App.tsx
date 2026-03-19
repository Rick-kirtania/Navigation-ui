import { RouterProvider } from 'react-router';
import { Suspense } from 'react';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg mx-auto mb-4 animate-pulse">
              🎓
            </div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      }>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}