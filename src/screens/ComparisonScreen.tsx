import { memo, useState, useRef, useEffect } from 'react';
import { ERAS, getEraPhoto } from '../data';
import { readParams, writeParams } from '../hooks/useUrlSync';
import { ShareButton } from '../components/ShareButton';
import { useIsDesktop } from '../hooks/useIsDesktop';

const ERA_YEARS = [
  { label: '1968', value: 1968 },
  { label: '1990', value: 1990 },
  { label: '2011', value: 2011 },
  { label: '2024', value: 2024 },
];

export const ComparisonScreen = memo(function ComparisonScreen() {
  const isDesktop = useIsDesktop();
  const initParams = readParams();
  const [leftYear, setLeftYear] = useState(Number(initParams.get('left') ?? 1968));
  const [rightYear, setRightYear] = useState(Number(initParams.get('right') ?? 2024));
  const [divider, setDivider] = useState(50);
  const splitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    writeParams({ screen: 'comparison', left: String(leftYear), right: String(rightYear) });
  }, [leftYear, rightYear]);

  const leftEra = ERAS.find((e) => e.years.includes(leftYear)) ?? ERAS[0];
  const rightEra = ERAS.find((e) => e.years.includes(rightYear)) ?? ERAS[2];

  const handleDividerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDividerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const rect = splitRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.min(90, Math.max(10, (x / rect.width) * 100));
    setDivider(pct);
  };

  return (
    <div
      className="screen-enter"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 24px 16px',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <div>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '4px',
          }}>
            Era Comparison
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700 }}>
            {leftYear} vs {rightYear}
          </h2>
        </div>
        <ShareButton />
      </div>

      {/* Split view */}
      <div ref={splitRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Left panel — full size, cropped from the right */}
        <div style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - divider}% 0 0)`,
          background: 'linear-gradient(135deg, #0e0c0a 0%, #141210 100%)',
        }}>
          <EraPanel year={leftYear} era={leftEra} side="left" />
        </div>

        {/* Right panel — full size, cropped from the left */}
        <div style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 0 0 ${divider}%)`,
          background: 'linear-gradient(225deg, #111208 0%, #0c0b09 100%)',
        }}>
          <EraPanel year={rightYear} era={rightEra} side="right" />
        </div>

        {/* Divider line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: `${divider}%`,
          transform: 'translateX(-50%)',
          width: '1px',
          height: '100%',
          background: 'var(--accent-border)',
          pointerEvents: 'none',
          zIndex: 9,
        }} />

        {/* Divider handle */}
        <div
          onPointerDown={handleDividerPointerDown}
          onPointerMove={handleDividerPointerMove}
          style={{
            position: 'absolute',
            top: 0,
            left: `${divider}%`,
            transform: 'translateX(-50%)',
            width: '32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'ew-resize',
            touchAction: 'none',
          }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M1 5L4 2M1 5L4 8M13 5L10 2M13 5L10 8" stroke="#0a0908" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom timeline selectors */}
      <div style={{
        padding: '12px 24px',
        paddingBottom: isDesktop ? '12px' : 'calc(12px + var(--bottom-nav-height))',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexShrink: 0,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>Before</span>
          {ERA_YEARS.map(({ label, value }) => (
            <button
              key={`l-${value}`}
              onClick={() => setLeftYear(value)}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                border: `1px solid ${leftYear === value ? 'var(--accent)' : 'var(--border)'}`,
                background: leftYear === value ? 'var(--accent-dim)' : 'transparent',
                color: leftYear === value ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>After</span>
          {ERA_YEARS.map(({ label, value }) => (
            <button
              key={`r-${value}`}
              onClick={() => setRightYear(value)}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                border: `1px solid ${rightYear === value ? 'var(--accent)' : 'var(--border)'}`,
                background: rightYear === value ? 'var(--accent-dim)' : 'transparent',
                color: rightYear === value ? 'var(--accent)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

function EraPanel({
  year,
  era,
  side,
}: {
  year: number;
  era: (typeof ERAS)[0];
  side: 'left' | 'right';
}) {
  const photo = getEraPhoto(year);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* Background: photo or fallback SVG rings */}
      {photo ? (
        <img
          src={photo}
          alt={`Stadium ${year}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: side === 'left'
            ? 'linear-gradient(135deg, #0e0c0a 0%, #141210 100%)'
            : 'linear-gradient(225deg, #111208 0%, #0c0b09 100%)',
        }}>
          <svg viewBox="0 0 300 200" fill="none" style={{ width: '100%', height: '100%', opacity: 0.12 }}>
            <ellipse cx="150" cy="100" rx="140" ry="90" stroke="#d4a843" strokeWidth="1"/>
            <ellipse cx="150" cy="100" rx="100" ry="65" stroke="#d4a843" strokeWidth="0.8"/>
            <ellipse cx="150" cy="100" rx="60" ry="38" stroke="#d4a843" strokeWidth="0.6"/>
          </svg>
        </div>
      )}

      {/* Dark gradient overlay for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.4) 55%, rgba(10,9,8,0.15) 100%)',
      }} />

      {/* Text — anchored to bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'right' ? 'flex-end' : 'flex-start',
      }}>
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(237,232,224,0.55)',
          textTransform: 'uppercase',
          marginBottom: '6px',
          textAlign: side,
        }}>
          {era.range}
        </div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          textAlign: side,
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}>
          {year}
        </div>
        <p style={{
          fontSize: '12px',
          color: 'rgba(237,232,224,0.6)',
          lineHeight: 1.6,
          marginTop: '12px',
          maxWidth: '200px',
          textAlign: side,
        }}>
          {era.description}
        </p>
      </div>
    </div>
  );
}
