export const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDateShort = (iso: string): string => {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (iso: string): string => {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (iso: string): string => {
  return `${formatDate(iso)} · ${formatTime(iso)}`;
};

export const formatRelative = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
};

export const isUpcoming = (iso: string): boolean => {
  return new Date(iso).getTime() >= Date.now();
};

export const isRegistrationOpen = (deadline: string, status: string): boolean => {
  if (status === 'CANCELLED' || status === 'COMPLETED') return false;
  return new Date(deadline).getTime() >= Date.now();
};

export const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};
