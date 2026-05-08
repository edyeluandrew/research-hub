import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const correctUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'password';

    if (username === correctUsername && password === correctPassword) {
      // Store session token
      sessionStorage.setItem('adminToken', 'authenticated');
      sessionStorage.setItem('adminLoginTime', new Date().getTime());
      navigate('/labs');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-200">
      <Header />

      <section className="py-20 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <div className="card p-8 bg-dark-100/50 backdrop-blur-xl border border-gold-500/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-500/20 rounded-lg">
                  <Lock className="text-gold-500" size={32} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gold-500 mb-2">Admin Access</h1>
              <p className="text-gray-400">Enter your credentials to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input w-full"
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-3"
              >
                <LogIn size={18} />
                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
              </button>
            </form>

            {/* Footer Note */}
            <p className="text-gray-400 text-xs text-center mt-6 pt-6 border-t border-gray-700">
              Only authorized personnel can access this area
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminLogin;
