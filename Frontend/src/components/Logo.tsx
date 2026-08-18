import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
  showText?: boolean;
}

const sizeClasses = {
  sm: { box: 'h-8 w-8', text: 'text-base' },
  md: { box: 'h-9 w-9', text: 'text-lg' },
  lg: { box: 'h-11 w-11', text: 'text-xl' },
};

export function Logo({ size = 'md', dark = false, showText = true }: LogoProps) {
  const s = sizeClasses[size];
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`relative flex ${s.box} items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-electric-600 shadow-soft transition-transform group-hover:scale-105`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h3l2-7 4 14 2-7h7" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-400 ring-2 ring-white" />
      </div>
      {showText && (
        <span className={`font-display ${s.text} font-extrabold tracking-tight ${dark ? 'text-white' : 'text-navy-900'}`}>
          Campus<span className="text-electric-500">Pulse</span>
        </span>
      )}
    </Link>
  );
}
