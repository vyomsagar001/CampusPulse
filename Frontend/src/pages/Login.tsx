
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

const demoAccounts = [
  { label: 'Student', email: 'aarav.sharma@muj.manipal.edu' },
  { label: 'Club Admin', email: 'priya.nair@muj.manipal.edu' },
  { label: 'Campus Admin', email: 'rohan.verma@manipal.edu' },
];

export function LoginPage() {
  const { login, googleLogin, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed. Please try again.'
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    setError('');

    try {
      if (!credentialResponse.credential) {
        throw new Error(
          'Google authentication failed. No credential received.'
        );
      }

      await googleLogin(credentialResponse.credential);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Google login failed. Please try again.'
      );
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  const handleDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo1234');
    setError('');
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-accent-600/20 blur-3xl" />

        <div className="relative">
          <Logo dark />
        </div>

        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight text-white text-balance">
            Everything happening on campus, in one pulse.
          </h2>

          <p className="mt-4 max-w-md text-lg text-navy-200">
            Discover events, connect with student communities, and never miss
            what's happening around campus.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              'Discover and register for campus events',
              'Follow your favorite clubs',
              'Get instant notifications and announcements',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-navy-100"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-600/20 text-electric-300">
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-sm text-navy-300">
          © 2026 CampusPulse · MUJ
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <h1 className="font-display text-2xl font-bold text-navy-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your CampusPulse account to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@muj.manipal.edu"
              icon={<Mail className="h-4 w-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock className="h-4 w-4" />}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-electric-600 focus:ring-electric-500"
                />
                Remember me
              </label>

              <Link
                to="/login"
                className="text-sm font-semibold text-electric-600 hover:text-electric-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Google Sign-In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-50 px-3 text-slate-500">
                  or
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="continue_with"
                shape="rectangular"
                width="384"
              />
            </div>
          </div>

          {/* Demo login */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">
              Quick demo login (any password works):
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  onClick={() => handleDemo(a.email)}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-navy-700 transition-colors hover:bg-electric-100 hover:text-electric-700"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-electric-600 hover:text-electric-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

