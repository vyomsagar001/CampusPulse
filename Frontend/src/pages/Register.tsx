import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, IdCard, AlertCircle, ArrowRight, X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/Logo';

const departments = [
  { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
  { value: 'Information Technology', label: 'Information Technology' },
  { value: 'Electronics & Communication', label: 'Electronics & Communication' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Biotechnology', label: 'Biotechnology' },
  { value: 'Business Administration', label: 'Business Administration' },
];

const years = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
];

const interestSuggestions = ['AI/ML', 'Web Development', 'Robotics', 'Hackathons', 'Cultural', 'Sports', 'Music', 'Photography', 'Debate', 'Entrepreneurship'];
const skillSuggestions = ['React', 'Python', 'Java', 'C++', 'Node.js', 'TypeScript', 'PyTorch', 'Figma', 'Public Speaking', 'Leadership'];

export function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    department: '',
    year: '',
    interests: [] as string[],
    skills: [] as string[],
  });
  const [interestInput, setInterestInput] = useState('');
  const [skillInput, setSkillInput] = useState('');

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const addInterest = (val: string) => {
    const v = val.trim();
    if (v && !form.interests.includes(v)) {
      setForm((f) => ({ ...f, interests: [...f.interests, v] }));
    }
    setInterestInput('');
  };

  const addSkill = (val: string) => {
    const v = val.trim();
    if (v && !form.skills.includes(v)) {
      setForm((f) => ({ ...f, skills: [...f.skills, v] }));
    }
    setSkillInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        studentId: form.studentId,
        department: form.department,
        year: parseInt(form.year, 10),
        interests: form.interests,
        skills: form.skills,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left form panel */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Join CampusPulse and start exploring campus life.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 animate-fade-in">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Aarav Sharma"
              icon={<User className="h-4 w-4" />}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@muj.manipal.edu"
              icon={<Mail className="h-4 w-4" />}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Student ID"
                name="studentId"
                value={form.studentId}
                onChange={(e) => update('studentId', e.target.value)}
                placeholder="2233010001"
                icon={<IdCard className="h-4 w-4" />}
                required
              />
              <Select
                label="Year"
                name="year"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                options={years}
                placeholder="Select"
                required
              />
            </div>
            <Select
              label="Department"
              name="department"
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              options={departments}
              placeholder="Select department"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Min 6 characters"
                icon={<Lock className="h-4 w-4" />}
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={(e) => update('confirmPassword', e.target.value)}
                placeholder="Re-enter"
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>

            {/* Interests */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-800">Interests</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest(interestInput);
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-200"
                />
                <button
                  type="button"
                  onClick={() => addInterest(interestInput)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors hover:bg-navy-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {form.interests.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.interests.map((i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded-lg bg-electric-50 px-2.5 py-1 text-xs font-semibold text-electric-700">
                      {i}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, interests: f.interests.filter((x) => x !== i) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {interestSuggestions.filter((s) => !form.interests.includes(s)).slice(0, 5).map((s) => (
                  <button key={s} type="button" onClick={() => addInterest(s)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-electric-300 hover:text-electric-700">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-navy-800">Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder="Type and press Enter"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-200"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-white transition-colors hover:bg-navy-800"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {form.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {form.skills.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-lg bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">
                      {s}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skillSuggestions.filter((s) => !form.skills.includes(s)).slice(0, 5).map((s) => (
                  <button key={s} type="button" onClick={() => addSkill(s)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-accent-300 hover:text-accent-700">
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-500">
              Your account will be created as a <span className="font-semibold text-navy-700">Student</span>. Club and campus admin roles are assigned by the administration.
            </div>

            <Button type="submit" fullWidth size="lg" loading={isLoading}>
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-electric-600 hover:text-electric-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right visual panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent-600/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-electric-600/20 blur-3xl" />
        <div className="relative">
          <Logo dark />
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight text-white text-balance">
            Be part of the pulse.
          </h2>
          <p className="mt-4 max-w-md text-lg text-navy-200">
            Register once and get access to every event, club, and announcement on campus — all in one place.
          </p>
          <ul className="mt-8 space-y-3">
            {['Discover and register for events', 'Follow your favorite clubs', 'Get instant notifications', 'Report issues and give feedback'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-navy-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-electric-600/20 text-electric-300">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative text-sm text-navy-300">© 2026 CampusPulse · MUJ</div>
      </div>
    </div>
  );
}
