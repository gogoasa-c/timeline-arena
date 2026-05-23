import { useClock } from '../hooks/useClock';

export function StatusBar() {
  const time = useClock();

  return (
    <div style={{
      height: 'var(--status-bar-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      flexShrink: 0,
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.02em',
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" opacity="1"/>
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" opacity="1"/>
          <rect x="9" y="2" width="3" height="10" rx="1" fill="currentColor" opacity="1"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" opacity="0.3"/>
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5C8.55 10.5 9 10.05 9 9.5C9 8.95 8.55 8.5 8 8.5C7.45 8.5 7 8.95 7 9.5C7 10.05 7.45 10.5 8 10.5Z" fill="currentColor"/>
          <path d="M8 6.5C6.9 6.5 5.9 6.95 5.17 7.68L6.23 8.74C6.68 8.28 7.31 8 8 8C8.69 8 9.32 8.28 9.77 8.74L10.83 7.68C10.1 6.95 9.1 6.5 8 6.5Z" fill="currentColor"/>
          <path d="M8 3C6.02 3 4.22 3.8 2.93 5.09L3.99 6.15C4.99 5.14 6.42 4.5 8 4.5C9.58 4.5 11.01 5.14 12.01 6.15L13.07 5.09C11.78 3.8 9.98 3 8 3Z" fill="currentColor"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/>
          <path d="M23 4.5V7.5C23.83 7.2 24.5 6.4 24.5 5.5 24.5 4.6 23.83 3.8 23 3.5V4.5Z" fill="currentColor" fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}
