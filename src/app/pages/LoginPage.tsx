import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Mail, Lock, UserCircle, ShieldCheck } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // adjust path if needed
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 🔥 SAVE LAST LOGIN HERE
    await updateDoc(doc(db, "users", user.uid), {
      lastLogin: serverTimestamp()
    });

    // 🔥 GET USER ROLE
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User data not found!");
      return;
    }

    const userData = userSnap.data();

    // 🔥 NAVIGATION
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/app");
    }

  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* University Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
              🎓
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Login to SVU Smart Campus
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Access your campus navigation dashboard
          </p>

          {/* Login Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setLoginRole('student')}
              className={`p-4 rounded-xl border-2 transition-all ${
                loginRole === 'student'
                  ? 'border-sky-500 bg-sky-50 text-sky-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-sky-300'
              }`}
            >
              <UserCircle className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">Login as Student</div>
            </button>
            <button
              type="button"
              onClick={() => setLoginRole('admin')}
              className={`p-4 rounded-xl border-2 transition-all ${
                loginRole === 'admin'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
              }`}
            >
              <ShieldCheck className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm font-semibold">Login as Admin</div>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@svu.edu.in"
                  required
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                loginRole === 'admin'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700'
              }`}
            >
              Login {loginRole === 'admin' ? 'to Admin Panel' : 'to Dashboard'}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New Student?{' '}
              <Link
                to="/signup"
                className="text-sky-600 hover:text-sky-700 font-semibold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
