import type { Screen } from '../types';
import { getYearData } from '../data';

const NAV_ITEMS: { id: Screen; label: string; icon: React.ReactNode }[] = [
  {
    id: 'home',
    label: 'Timeline',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'comparison',
    label: 'Compare',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 2.5V13.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
        <rect x="2" y="2" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M6 9H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'hotspots',
    label: 'Map',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <ellipse cx="8" cy="8" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2.5 8H13.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
];

interface SidebarProps {
  screen: Screen;
  year: number;
  onNavigate: (s: Screen) => void;
  onAddMemory: () => void;
}

export function Sidebar({ screen, year, onNavigate, onAddMemory }: SidebarProps) {
  const yearData = getYearData(year);
  const activeNav = screen === 'yearDetail' ? 'home' : screen;

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid var(--border)',
      background: 'var(--bg)',
      height: '100%',
    }}>
      {/* Wordmark */}
      <div style={{ padding: '28px 20px 24px' }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '2px',
        }}>
          Timeline
        </div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          ARENA
        </div>
        <div style={{
          width: '28px',
          height: '2px',
          background: 'var(--accent)',
          marginTop: '8px',
        }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const active = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: active ? 500 : 400,
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                background: active ? 'var(--accent-dim)' : 'transparent',
                border: active ? '1px solid var(--accent-border)' : '1px solid transparent',
                transition: 'all 0.15s',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '0 20px' }} />

      {/* Add Memory */}
      <div style={{ padding: '16px 12px' }}>
        <button
          onClick={onAddMemory}
          style={{
            width: '100%',
            padding: '11px 16px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--accent)',
            color: '#0a0908',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span style={{ fontSize: '16px', lineHeight: 1 }}>+</span>
          Add Memory
        </button>
      </div>

      {/* Year display */}
      <div style={{ padding: '12px 20px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          {year}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
          {yearData.eraSubtitle}
        </div>
      </div>
    </aside>
  );
}
