import { useEffect, useState } from 'react';
import { AlertCircle, Plus, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { EmptyState, LoadingState } from '@/components/ui/States';
import { useAuth } from '@/context/AuthContext';
import { mockIssues } from '@/data/mockData';
import { formatDate } from '@/utils/format';
import type { Issue, IssueCategory, IssueStatus } from '@/types';

const categoryOptions = [
  { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
  { value: 'HOSTEL', label: 'Hostel' },
  { value: 'TRANSPORT', label: 'Transport' },
  { value: 'TECHNICAL', label: 'Technical' },
  { value: 'CLEANLINESS', label: 'Cleanliness' },
  { value: 'OTHER', label: 'Other' },
];

const statusConfig: Record<IssueStatus, { label: string; color: 'emerald' | 'amber' | 'slate' | 'red' }> = {
  SUBMITTED: { label: 'Submitted', color: 'slate' },
  IN_REVIEW: { label: 'In Review', color: 'amber' },
  RESOLVED: { label: 'Resolved', color: 'emerald' },
  REJECTED: { label: 'Rejected', color: 'red' },
};

const categoryLabels: Record<IssueCategory, string> = {
  INFRASTRUCTURE: 'Infrastructure',
  HOSTEL: 'Hostel',
  TRANSPORT: 'Transport',
  TECHNICAL: 'Technical',
  CLEANLINESS: 'Cleanliness',
  OTHER: 'Other',
};

export function IssuesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', location: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIssues(user ? mockIssues.filter((i) => i.userId === user.id) : []);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const newIssue: Issue = {
      id: `i${Date.now()}`,
      title: form.title,
      description: form.description,
      category: form.category as IssueCategory,
      location: form.location,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
      userId: user?.id ?? 'u1',
    };
    mockIssues.unshift(newIssue);
    setIssues((prev) => [newIssue, ...prev]);
    setForm({ title: '', description: '', category: '', location: '' });
    setSubmitting(false);
    setShowCreate(false);
  };

  if (loading) return <LoadingState count={3} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Issues & Feedback</h1>
          <p className="mt-1 text-sm text-slate-500">Report campus issues and track their resolution.</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" /> Submit Issue
        </Button>
      </div>

      {/* My Issues */}
      <section>
        <h2 className="font-display text-xl font-bold text-navy-900">My Issues</h2>
        {issues.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              title="No issues reported"
              message="You haven't reported any issues yet. Use the button above to submit one."
              icon={<AlertCircle className="h-7 w-7" />}
              action={<Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4" /> Submit Issue</Button>}
            />
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {issues.map((issue) => {
              const status = statusConfig[issue.status];
              return (
                <div key={issue.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-all hover:shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-navy-900">{issue.title}</h3>
                        <Badge color="electric">{categoryLabels[issue.category]}</Badge>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{issue.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                        <span>{issue.location}</span>
                        <span>·</span>
                        <span>{formatDate(issue.createdAt)}</span>
                      </div>
                    </div>
                    <Badge color={status.color}>{status.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Create Issue Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Report an Issue" description="Provide details about the issue you'd like to report.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Brief title for the issue" required />
          <Textarea label="Description" name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail..." required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Category" name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categoryOptions} placeholder="Select category" required />
            <Input label="Location" name="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. NLH 301, AB-3" required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-navy-800">Attachment (optional)</label>
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-slate-400">
              <Paperclip className="h-4 w-4" />
              <span>Click to upload (placeholder)</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button type="submit" loading={submitting}>Submit Issue</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
