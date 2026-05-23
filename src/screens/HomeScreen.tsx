import { memo, useMemo } from 'react';
import { StadiumRing } from '../components/StadiumRing';
import { getYearData, TIMELINE_YEARS } from '../data';
import type { Screen } from '../types';

interface HomeScreenProps {
  year: number;
  setYear: (y: number) => void;
  onNavigate: (s: Screen) => void;
  onYearDetail: () => void;
}

export const HomeScreen = memo(function HomeScreen({
  year,
  setYear,
  onNavigate,
  onYearDetail,
}: HomeScreenProps) {
  const data = useMemo(() => getYearData(year), [year]);

  const minYear = TIMELINE_YEARS[0];
  const maxYear = TIMELINE_YEARS[TIMELINE_YEARS.length - 1];
  const pct = ((year - minYear) / (maxYear - minYear)) * 100;

  return (
    <div
      className="screen-enter"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Background rings */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <StadiumRing opacity={0.18} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 48px',
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '8px',
        }}>
          {data.eraName}
          <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>·</span>
          <span style={{ color: 'var(--text-muted)' }}>{data.eraSubtitle}</span>
        </div>

        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(72px, 12vw, 120px)',
          fontWeight: 700,
          lineHeight: 0.9,
          color: 'var(--text)',
          marginBottom: '24px',
          letterSpacing: '-0.02em',
        }}>
          {year}
        </div>

        <p style={{
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'var(--text-muted)',
          maxWidth: '360px',
          marginBottom: '32px',
        }}>
          {data.description}
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <ActionButton onClick={() => onNavigate('comparison')} icon="◑">
            Compare eras
          </ActionButton>
          <ActionButton onClick={() => onNavigate('hotspots')} icon="⊕">
            Explore map
          </ActionButton>
          <ActionButton onClick={() => onNavigate('archive')} icon="▦">
            Archive
          </ActionButton>
        </div>
      </div>

      {/* Timeline scrubber */}
      <TimelineScrubber
        year={year}
        setYear={setYear}
        onYearDetail={onYearDetail}
        pct={pct}
      />
    </div>
  );
});

function ActionButton({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-strong)',
        background: 'rgba(237,232,224,0.04)',
        color: 'var(--text)',
        fontSize: '12px',
        letterSpacing: '0.01em',
        transition: 'border-color 0.15s, background 0.15s',
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-border)';
        e.currentTarget.style.background = 'var(--accent-dim)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)';
        e.currentTarget.style.background = 'rgba(237,232,224,0.04)';
      }}
    >
      <span style={{ opacity: 0.7 }}>{icon}</span>
      {children}
    </button>
  );
}

function TimelineScrubber({
  year,
  setYear,
  onYearDetail,
  pct,
}: {
  year: number;
  setYear: (y: number) => void;
  onYearDetail: () => void;
  pct: number;
}) {
  const minYear = TIMELINE_YEARS[0];
  const maxYear = TIMELINE_YEARS[TIMELINE_YEARS.length - 1];

  const labelYears = TIMELINE_YEARS.filter((_, i) =>
    [0, 3, 6, 9, 12, 15, TIMELINE_YEARS.length - 1].includes(i)
  );

  return (
    <div style={{
      position: 'relative',
      zIndex: 1,
      padding: '0 48px 28px',
      borderTop: '1px solid var(--border)',
      paddingTop: '16px',
    }}>
      {/* Year labels */}
      <div style={{ position: 'relative', height: '18px', marginBottom: '10px' }}>
        {labelYears.map((y) => {
          const p = ((y - minYear) / (maxYear - minYear)) * 100;
          return (
            <button
              key={y}
              onClick={() => setYear(y)}
              style={{
                position: 'absolute',
                left: `${p}%`,
                transform: 'translateX(-50%)',
                fontSize: '10px',
                color: y === year ? 'var(--accent)' : 'var(--text-dim)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {y}
            </button>
          );
        })}
      </div>

      {/* Track */}
      <div style={{ position: 'relative', height: '3px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--border-strong)',
          borderRadius: '2px',
        }} />
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${pct}%`,
          background: 'var(--accent)',
          borderRadius: '2px',
          transition: 'width 0.2s',
        }} />

        {/* Thumb */}
        <button
          aria-label={`Selected year: ${year}`}
          onClick={onYearDetail}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--accent)',
            border: '2px solid var(--bg)',
            boxShadow: '0 0 0 2px var(--accent)',
            cursor: 'pointer',
            transition: 'left 0.2s',
            zIndex: 2,
          }}
        />

        {/* Invisible range input for drag */}
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={year}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            const closest = TIMELINE_YEARS.reduce((a, b) =>
              Math.abs(b - v) < Math.abs(a - v) ? b : a
            );
            setYear(closest);
          }}
          style={{
            position: 'absolute',
            inset: '-8px 0',
            opacity: 0,
            cursor: 'pointer',
            width: '100%',
            margin: 0,
            zIndex: 3,
          }}
        />
      </div>

      {/* Year tick marks */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
        position: 'relative',
      }}>
        {TIMELINE_YEARS.map((y) => {
          const p = ((y - minYear) / (maxYear - minYear)) * 100;
          return (
            <div
              key={y}
              style={{
                position: 'absolute',
                left: `${p}%`,
                transform: 'translateX(-50%)',
                width: '1px',
                height: '4px',
                background: y === year ? 'var(--accent)' : 'var(--border-strong)',
                transition: 'background 0.15s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
