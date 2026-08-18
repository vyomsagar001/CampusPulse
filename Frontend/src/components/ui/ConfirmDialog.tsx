import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  danger?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading,
  danger,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            danger ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-600'
          }`}
        >
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-display text-lg font-bold text-navy-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" fullWidth onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} fullWidth onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
