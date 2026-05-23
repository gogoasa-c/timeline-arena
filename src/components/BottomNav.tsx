import { createPortal } from 'react-dom';
import type { Screen } from '../types';

const NAV_ITEMS = [
  {
    id: 'home' as Screen,
    label: 'Timeline',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <circle cx="11" cy="11" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'comparison' as Screen,
    label: 'Compare',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <path d="M11 3.5V18.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
      </svg>
    ),
  },
  {
    id: 'archive' as Screen,
    label: 'Archive',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="7" width="16" height="12" rx="2" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <rect x="3" y="3" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <path d="M8.5 13H13.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'hotspots' as Screen,
    label: 'Map',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <ellipse cx="11" cy="11" rx="3.5" ry="7.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
        <path d="M3.5 11H18.5" stroke="currentColor" strokeWidth={active ? 1.8 : 1.3}/>
      </svg>
    ),
  },
];

interface BottomNavProps {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  onUpload: () => void;
}

function BottomNavContent({ screen, onNavigate, onUpload }: BottomNavProps) {
  const activeNav = screen === 'yearDetail' ? 'home' : screen;
  const half = Math.floor(NAV_ITEMS.length / 2);
  const left = NAV_ITEMS.slice(0, half);
  const right = NAV_ITEMS.slice(half);

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottom-nav-height)',
        background: 'rgba(10, 9, 8, 0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 100,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {left.map(({ id, label, icon }) => {
        const active = activeNav === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            aria-label={label}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '8px 0',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              minHeight: '44px',
              transition: 'color 0.15s',
            }}
          >
            {icon(active)}
            <span style={{ fontSize: '10px', letterSpacing: '0.03em' }}>{label}</span>
          </button>
        );
      })}

      {/* Central Upload Button */}
      <div style={{ flex: '0 0 80px', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onUpload}
          aria-label="Add Memory"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: '#0a0908',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
            boxShadow: '0 0 0 3px rgba(212,168,67,0.2)',
            transition: 'opacity 0.15s, transform 0.15s',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.88';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          +
        </button>
      </div>

      {right.map(({ id, label, icon }) => {
        const active = activeNav === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            aria-label={label}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '8px 0',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              minHeight: '44px',
              transition: 'color 0.15s',
            }}
          >
            {icon(active)}
            <span style={{ fontSize: '10px', letterSpacing: '0.03em' }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function BottomNav(props: BottomNavProps) {
  return createPortal(<BottomNavContent {...props} />, document.body);
}
