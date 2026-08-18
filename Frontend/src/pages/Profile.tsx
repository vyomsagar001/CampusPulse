import { useState } from 'react';
import { Mail, Phone, IdCard, GraduationCap, Heart, Wrench, Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    bio: user?.profile?.bio ?? '',
    phone: user?.profile?.phone ?? '',
  });

  const handleSave = () => {
    updateUser({
      name: form.name,
      profile: { ...user?.profile, bio: form.bio, phone: form.phone },
    });
    setEditing(false);
  };

  if (!user) return null;

  const roleLabels = { STUDENT: 'Student', CLUB_ADMIN: 'Club Admin', CAMPUS_ADMIN: 'Campus Admin' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy-900">My Profile</h1>
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Pencil className="h-4 w-4" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setEditing(false)}><X className="h-4 w-4" /> Cancel</Button>
            <Button onClick={handleSave}><Save className="h-4 w-4" /> Save</Button>
          </div>
        )}
      </div>

      {/* Profile header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft lg:p-8">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-electric-100/40 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative">
            <img
              src={user.profile?.profilePicture ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="h-24 w-24 rounded-2xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 ring-2 ring-white">
              <span className="block h-3 w-3 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex-1">
            {editing ? (
              <Input label="Name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-navy-900">{user.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{user.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge color="electric">{roleLabels[user.role]}</Badge>
                  {user.academic?.department && <Badge color="navy">{user.academic.department}</Badge>}
                  {user.academic?.year && <Badge color="accent">Year {user.academic.year}</Badge>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-navy-900">Contact Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-50 text-electric-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Email</p>
                <p className="text-sm font-semibold text-navy-900">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400">Phone</p>
                {editing ? (
                  <Input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Add phone number" className="mt-1" />
                ) : (
                  <p className="text-sm font-semibold text-navy-900">{user.profile?.phone || 'Not provided'}</p>
                )}
              </div>
            </div>
            {user.studentId && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <IdCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Student ID</p>
                  <p className="text-sm font-semibold text-navy-900">{user.studentId}</p>
                </div>
              </div>
            )}
            {user.academic?.department && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Department</p>
                  <p className="text-sm font-semibold text-navy-900">{user.academic.department}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-navy-900">About</h3>
          {editing ? (
            <div className="mt-4">
              <Textarea label="Bio" name="bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell others about yourself..." />
            </div>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {user.profile?.bio || 'No bio added yet. Click Edit Profile to add one.'}
            </p>
          )}
        </div>
      </div>

      {/* Interests & Skills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent-500" />
            <h3 className="font-display text-lg font-bold text-navy-900">Interests</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest) => (
                <span key={interest} className="rounded-lg bg-accent-50 px-3 py-1.5 text-sm font-semibold text-accent-700">
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">No interests added yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-electric-500" />
            <h3 className="font-display text-lg font-bold text-navy-900">Skills</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill) => (
                <span key={skill} className="rounded-lg bg-electric-50 px-3 py-1.5 text-sm font-semibold text-electric-700">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">No skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
